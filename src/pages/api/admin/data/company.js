import Admin from "@/../models/adminSchema";
import Client from "@/../models/clientSchema";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Task from "@/../models/taskSchema";
import FileSubmission from "@/../models/fileSubmissionSchema";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {clientid, accessid, getTasks} = req.body;

		// Check for fields
		if (!clientid || !accessid) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get client data
		try {
			let clients = await Client.findById(clientid);

			if (getTasks) {
				// Get client tasks
				clients = clients.toObject();
				clients.tasks = await Task.find({
					client_id: clientid,
				});
				await Promise.all(clients.tasks.map(async (task, index) => {
					task = task.toObject();
					if (task.file_submission_id) {
						const fileSubmission = await FileSubmission.findById(task.file_submission_id);
						clients.tasks[index] = {
							...task,
							file_submission: fileSubmission ? fileSubmission.toObject() : null
						};
					}
				}));
			}

			res.status(200).json({success: true, data: clients});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}