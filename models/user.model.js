const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true, required: true, select: false },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true, select: false },
		fullName: { type: String, required: true },
		birthday: { type: Date, required: false },
	},
	{ timestamps: true, _id: 'id' }
)

module.exports = mongoose.model('Users', UserSchema)
