import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Admin from "../../../../../../models/admin-schema";
import Task from "../../../../../../models/task-schema";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {accessid, taskid, comment} = req.body;

		// Check for fields
		if (!accessid || !taskid) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get task
		try {
			const task = await Task.findById(taskid);
			if (!task) {
				return res.status(404).json({success: false, message: "Task not found"});
			}

			// Update task
			task.status = "Újraküldendő";
			task.comment = comment;
			await task.save();

			res.status(201).json({success: true});
		} catch (error) {
			res.status(500).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}