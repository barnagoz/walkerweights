import mongoose from "mongoose";

const FileSubmissionSchema = new mongoose.Schema({
	file_url: {type: String, required: true},
	submitted_at: {type: Date, default: Date.now},
});

module.exports = mongoose.models.FileSubmission || mongoose.model("FileSubmission", FileSubmissionSchema);
