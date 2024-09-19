import Admin from "@/../models/adminSchema";
import Client from "@/../models/clientSchema";
import { permissionList } from "@/lib/data/permission";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {accessid} = req.body;

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("client-list")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get all clients
		try {
			let clients = await Client.find();
			res.status(200).json({success: true, data: clients});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}