import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/mongoose";
import Admin from "/models/admin-schema";
import Client from "/models/client-schema";
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
                            type: "admin",
                            id: user._id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            access_list: user.access_list,
                            email_verified: user.email_verified,
                        };
                    }
                }
                const client = await Client.findOne({email: credentials.email});
                if (client) {
                    const isValidPassword = await bcrypt.compare(credentials.password, client.password);
                    if (isValidPassword) {
	                    client.session_token = await bcrypt.hashSync(client.email + Date.now(), 10);
	                    await client.save();
                        return {
                            type: "client",
                            id: client._id,
                            email: client.email,
                            first_name: client.first_name,
                            last_name: client.last_name,
	                        session_token: client.session_token,
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
                if (user.type === "admin") {
                    token.type = user.type;
                    token.id = user.id;
                    token.email = user.email;
                    token.first_name = user.first_name;
                    token.last_name = user.last_name;
                    token.access_list = user.access_list;
                } else if (user.type === "client") {
                    token.type = user.type;
                    token.id = user.id;
                    token.email = user.email;
                    token.first_name = user.first_name;
                    token.last_name = user.last_name;
	                token.session_token = user.session_token
                }
            }
            return token;
        },
        async session ({session, token}) {
            if (token.type === "admin") {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = `${token.first_name} ${token.last_name}`;
                session.user.access_list = token.access_list;
                session.user.type = token.type;
            } else if (token.type === "client") {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = `${token.first_name} ${token.last_name}`;
                session.user.type = token.type;
	            session.user.session_token = token.session_token;
            }
            return session;
        },

    },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/login",
    },
};

export default NextAuth(authOptions);