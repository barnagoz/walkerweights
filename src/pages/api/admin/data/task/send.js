import Admin from "../../../../../../models/admin-schema";
import Task from "../../../../../../models/task-schema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export async function sendTask (title, description, client, type, formID) {
	if (type === "form") {
		const task = new Task({
			title,
			description,
			client_id: client,
			type,
			status: "Új",
			created_at: new Date(),
			form_id: new ObjectId(formID),
		});
		return await task.save();
	} else {
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
}

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {clientid, accessid, title, description, type, formID} = req.body;

		// Check for fields
		if (!clientid || !accessid || !title || !description || !type) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}
		if (type === "form" && !formID) {
			return res.status(401).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-task-send") || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Add task to client
		try {
			if (type === "form") {
				const newTask = await sendTask(title, description, clientid, type, formID);
				res.status(201).json({success: true, data: newTask});
			}
			const newTask = await sendTask(title, description, clientid, type);
			res.status(201).json({success: true, data: newTask});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}