import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
	status: {type: String, default: "Feldolgozás alatt"},
	company_name: {type: String, required: true},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {type: String, required: true},
	first_name: {type: String},
	last_name: {type: String},
	data: {type: Array, default: []},
	created_at: {type: Date, default: Date.now},
	energeticInvestmentSince2021: {type: Boolean},
	energeticInvestmentWhen: {type: String},
	energeticInvestmentType: {type: String},
	energeticInvestmentAmount: {type: String},
	registerMessage: {type: String},
	password: {type: String},
	password_reset_token: {type: String, default: null},
	session_token: {type: String, default: null},
});

module.exports = mongoose.models.Client || mongoose.model("Client", ClientSchema);
