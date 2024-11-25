import dbConnect from "@/lib/mongoose";
import Task from "@/../models/taskSchema";
import Client from "@/../models/clientSchema";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {client_id, session_token} = req.body;

		try {
			// Check for valid session token
			await dbConnect();
			const client = await
				Client.findOne({_id: new ObjectId(client_id)});
			if (!client || client.session_token !== session_token) {
				return res.status(403).json({success: false, message: "Invalid session token"});
			}

			// Find client tasks
			const tasks = await Task.find({client_id: client_id});

			// Send tasks
			res.status(200).json({success: true, data: tasks});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}