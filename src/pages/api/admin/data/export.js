import dbConnect from "@/lib/mongoose";
import ExcelJS from 'exceljs';
import { ObjectId } from "mongodb";
import Admin from "../../../../../models/adminSchema";
import Client from "../../../../../models/clientSchema";

export default async function handler (req, res) {
	const {accessid} = req.body;

	// Check for fields
	if (!accessid) {
		return res.status(401).json({success: false, message: "Missing fields"});
	}

	// Check for sufficient permissions
	await dbConnect();
	const admin = await Admin.findOne({_id: new ObjectId(accessid)});
	if (!admin || !admin.access_list.includes("client-list") || !admin.access_list.includes("client-export")) {
		return res.status(403).json({success: false, message: "Insufficient permissions"});
	}

	// Get data from db
	const clients = await Client.find();

	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Ügyfelek");

	// Add data to worksheet
	const headerRow = worksheet.addRow(["Kitöltés", "Cég neve", "Vezetéknév", "Keresztnév", "Email cím", "Telefonszám", "2021" +
	" óta történt e. beruházás", "E. beruházás befejező éve", "E. beruházás típusa", "E. beruházás megtakarítása", "Megjegyzés"]);
	for (let i = 1; i <= 11; i++) {
		headerRow.getCell(i).font = {
			bold: true
		};
	}
	;
	clients.forEach((row, rowIndex) => {
		const rowValues = [row.created_at, row.company_name, row.last_name, row.first_name, row.email, row.phone, row.energeticInvestmentSince2021, row.energeticInvestmentWhen, row.energeticInvestmentType, row.energeticInvestmentAmount, row.registerMessage];
		const excelRow = worksheet.addRow(rowValues);
	});

	// Set column widths
	worksheet.columns.forEach((column, colIndex) => {
		let maxLength = 0;
		column.eachCell({includeEmpty: true}, (cell) => {
			const columnLength = cell.value ? cell.value.toString().length : 10;
			if (columnLength > maxLength) {
				maxLength = columnLength;
			}
		});
		column.width = maxLength < 10 ? 10 : maxLength;
	});

	// Write workbook to buffer
	const buffer = await workbook.xlsx.writeBuffer();
	res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	res.setHeader("Content-Disposition", `attachment; filename=Ügyfelek.xlsx`);
	res.status(200).send(buffer);
}