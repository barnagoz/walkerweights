import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema({
	answers: {type: Array, default: []},
	submitted_at: {type: Date, default: Date.now},
});

module.exports = mongoose.models.FormSubmission || mongoose.model("FormSubmission", FormSubmissionSchema);
