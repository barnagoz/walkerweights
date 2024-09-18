import Client from "@/../models/clientSchema";
import dbConnect from "@/lib/mongoose";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {
			company_name,
			email,
			phone,
			first_name,
			last_name,
			energeticInvestmentSince2011,
			energeticInvestmentWhen,
			energeticInvestmentType,
			energeticInvestmentAmount,
			registerMessage
		} = req.body;

		// Check for missing fields
		if (!company_name || !email || !phone || !first_name || !last_name) {
			return res.status(400).json({success: false, message: "Missing fields"});
		}

		// Create new client
		await dbConnect();
		const newClient = new Client({
			company_name,
			email,
			phone,
			first_name,
			last_name,
			energeticInvestmentSince2011: energeticInvestmentSince2011 || false,
			energeticInvestmentWhen: energeticInvestmentWhen || "",
			energeticInvestmentType: energeticInvestmentType || "",
			energeticInvestmentAmount: energeticInvestmentAmount || "",
			registerMessage: registerMessage || "",
		});
		try {
			await newClient.save();
			res.status(201).json({success: true, data: newClient});
		} catch (error) {
			console.log(error)
			res.status(400).json({success: false, error: error.message});
		}
	} else {
		res.status(400).json({success: false, message: "Invalid request method"});
	}
}