import Admin from "@/../models/adminSchema";
import Task from "@/../models/taskSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export async function sendTask (title, description, client, type) {
	const task = new Task({
		title,
		description,
		client_id: client,
		type,
		status: "Új",
		created_at: new Date(),
	});

	return await task.save();
}

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {clientid, accessid, title, description, type} = req.body;

		// Check for fields
		if (!clientid || !accessid || !title || !description || !type) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-task-send") || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Add task to client
		try {
			const newTask = await sendTask(title, description, clientid, type);
			res.status(200).json({success: true, data: newTask});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}