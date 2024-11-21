import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
	client_id: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
	title: {type: String, required: true},
	description: {type: String},
	status: {type: String, required: true},
	comment: {type: String},
	type: {type: String, required: true}, // options: "pdf", "xlsx", "form"
	form_id: {type: mongoose.Schema.Types.ObjectId, ref: "Form"},
	form_submission_id: {type: mongoose.Schema.Types.ObjectId, ref: "FormSubmission"},
	file_submission_id: {type: mongoose.Schema.Types.ObjectId, ref: "FileSubmission"},
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
