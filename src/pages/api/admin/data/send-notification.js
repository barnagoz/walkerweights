import DataRejectedEmail from "@/emails/data-rejected";
import { MoreDetailsNeededEmail } from "@/emails/more-details-needed";
import dbConnect from "@/lib/mongoose";
import sendEmail from "@/lib/email";
import Admin from "../../../../../models/admin-schema";
import Client from "../../../../../models/client-schema";
import { render } from "@react-email/render";

export default async function handler (req, res) {
	if (req.method === "POST") {
		const {clientid, emailtemplate, accessid} = req.body;

		if (!clientid || !emailtemplate || !accessid) {
			return res.status(401).json({success: false, message: "Missing parameters"});
		}

		// Check required permissions
		try {
			await dbConnect();
			const admin = await Admin.findById(accessid);
			if (!admin.access_list.includes("send-notification")) {
				return res.status(403).json({success: false, message: "Permission denied"});
			}
		} catch (e) {
			return res.status(500).json({success: false, message: e.message});
		}

		// Send notification
		try {
			const client = await Client.findById(clientid);
			if (!client) {
				return res.status(404).json({success: false, message: "Client not found"});
			}

			switch (emailtemplate) {
				case "data-rejected":
					const htmldr = await render(<DataRejectedEmail first_name={client.first_name}
					                                               last_name={client.last_name}
																   portal_link={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`}
					                                               company_name={client.company_name}/>, {pretty: true});
					const textdr = await render(<DataRejectedEmail first_name={client.first_name}
					                                               last_name={client.last_name}
																   portal_link={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`}
					                                               company_name={client.company_name}/>, {plainText: true});

					await sendEmail({
						to: client.email,
						subject: "Adatok elutasítva",
						html: htmldr,
						text: textdr,
					});
					break;
				case "more-details-needed":
					const htmlmdn = await render(<MoreDetailsNeededEmail first_name={client.first_name}
					                                                     last_name={client.last_name}
																		 portal_link={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`}
					                                                     company_name={client.company_name}/>, {pretty: true});
					const textmdn = await render(<MoreDetailsNeededEmail first_name={client.first_name}
					                                                     last_name={client.last_name}
																		 portal_link={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`}
					                                                     company_name={client.company_name}/>, {plainText: true});

					await sendEmail({
						to: client.email,
						subject: "Adatok beküldése szükséges",
						html: htmlmdn,
						text: textmdn,
					});
					break;
			}

			res.status(201).json({success: true});
		} catch (e) {
			console.log(e);
			res.status(500).json({success: false, message: e.message});
		}
	} else {
		res.status(400).json({success: false, message: "Method not allowed"});
	}
}