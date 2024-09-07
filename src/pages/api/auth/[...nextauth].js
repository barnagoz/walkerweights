import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/mongoose";
import Admin from "/models/adminSchema";
import bcrypt from "bcryptjs";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email cím", type: "email", placeholder: "pelda.janos@walkerweights.hu"},
                password: {label: "Jelszó", type: "password"}
            },
            async authorize (credentials) {
                await dbConnect();
                const user = await Admin.findOne({email: credentials.email});
                if (user) {
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (isValidPassword) {
                        return {
                            id: user._id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            access_list: user.access_list,
                            email_verified: user.email_verified,
                        };
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt ({token, user}) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.access_list = user.access_list;
                token.email_verified = user.email_verified;
            }
            return token;
        },
        async session ({session, token}) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = `${token.first_name} ${token.last_name}`;
            session.user.access_list = token.access_list;
            return session;
        },

    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
};

export default NextAuth(authOptions);