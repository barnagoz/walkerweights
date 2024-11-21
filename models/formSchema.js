import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String},
	fields: {type: Array, default: []},
});

module.exports = mongoose.models.Form || mongoose.model("Form", FormSchema);
