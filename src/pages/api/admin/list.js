import Admin from "@/../models/adminSchema";
import { permissionList } from "@/lib/data/permission";
import dbConnect from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {accessid} = req.body;

		// Check for sufficient permissions
		await dbConnect();
		const admin = await Admin.findOne({_id: new ObjectId(accessid)});
		if (!admin || !admin.access_list.includes("admin-management")) {
			return res.status(403).json({success: false, message: "Insufficient permissions"});
		}

		// Get all admins
		try {
			let admins = await Admin.find();
			admins = admins.map(admin => {
				const adminObj = admin.toObject();
				delete adminObj.password;
				delete adminObj._id;
				adminObj.defaccesslist = adminObj.access_list;
				adminObj.access_list = adminObj.access_list.map(permission => {
					return permissionList.find(p => p.code === permission).name;
				});
				return adminObj;
			});
			res.status(200).json({success: true, data: admins});
		} catch (error) {
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}