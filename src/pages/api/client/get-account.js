import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Client from "@/../models/clientSchema"

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {client_id, session_token} = req.body;

		try {
			// Check for valid session token
			await dbConnect();
			const client = await Client.findOne({_id: new ObjectId(client_id)});
			if (!client || client.session_token !== session_token) {
				return res.status(403).json({success: false, message: "Invalid session token"});
			}

			// Send client data
			client.password = undefined;
			client.password_reset_token = undefined;
			client.data = undefined;
			client.session_token = undefined;

			res.status(200).json({success: true, data: client});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}