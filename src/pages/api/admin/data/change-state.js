import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";
import Admin from "@/../models/adminSchema";
import Client from "@/../models/clientSchema";


export default async function handler (req, res) {
	if (req.method === "POST") {
		const {accessid, clientid, status, type} = req.body;

		// Check for fields
		if (!accessid || !clientid || !status || !type) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get client
		try {
			const client = await Client.findById(clientid);
			if (!client) {
				return res.status(404).json({success: false, message: "Client not found"});
			}

			// Update client
			client.status = status;
			client.project_type = type;
			await client.save();

			res.status(200).json({success: true});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}