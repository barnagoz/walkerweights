import Admin from "../../../../models/admin-schema";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcryptjs";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {email, password, token} = req.body;

		// Check for missing fields
		if (!email || !password || !token) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		try {
			// Check for valid token and email
			await dbConnect();
			const admin = await Admin.findOne({password_reset_token: token});
			if (!admin) {
				return res.status(400).json({success: false, message: "Invalid token"});
			}
			if (admin.email !== email) {
				return res.status(400).json({success: false, message: "Invalid email"});
			}

			// Update password
			admin.password = await bcrypt.hash(password, 10);
			admin.password_reset_token = null;
			if (admin.email_verified === false) {
				admin.email_verified = true;
			}
			await admin.save();

			res.status(200).json({success: true, data: admin});
		} catch (error) {
			return res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}