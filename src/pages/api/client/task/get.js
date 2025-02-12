import dbConnect from "@/lib/mongoose";
import Task from "../../../../../models/task-schema";
import Client from "../../../../../models/client-schema";
import Form from "../../../../../models/form-schema";
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

			// get forms for tasks
			const tasksWithForms = await Promise.all(tasks.map(async (task) => {
					if (task.type === "form") {
						const form = await Form.findOne({_id: task.form_id});
						return {
							...task.toObject(),
							form: form
						};
					}
					return task;
				}
			));


			// Send tasks
			res.status(200).json({success: true, data: tasksWithForms});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}