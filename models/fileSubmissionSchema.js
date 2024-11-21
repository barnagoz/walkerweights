import mongoose from "mongoose";

const FileSubmissionSchema = new mongoose.Schema({
	blob_url: {type: String, required: true},
	file_name: {type: String, required: true},
	submitted_at: {type: Date, default: Date.now},
});

module.exports = mongoose.models.FileSubmission || mongoose.model("FileSubmission", FileSubmissionSchema);
