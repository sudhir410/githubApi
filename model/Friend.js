const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    username: { type: String, required: true },
    friends: Array
}, { versionKey: false })

const friendModel = mongoose.model('Friend', friendSchema)

module.exports = friendModel;