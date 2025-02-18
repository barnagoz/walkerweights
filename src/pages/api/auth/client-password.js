import Client from "../../../../models/client-schema";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, password, token} = req.body;

		// Check for missing fields
		if (!email || !password || !token) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		try {
			// Check for valid token and email
			await dbConnect();
			const client = await Client.findOne({password_reset_token: token});
			if (!client) {
				return res.status(400).json({success: false, message: "Invalid token"});
			}
			if (client.email !== email) {
				return res.status(400).json({success: false, message: "Invalid email"});
			}

			// Update password
			client.password = await bcrypt.hash(password, 10);
			client.password_reset_token = null;
			await client.save();

			res.status(200).json({success: true, data: client});
		} catch (error) {
			return res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}