const mongoose = require('mongoose');


const passwordStorage = new mongoose.Schema({
    organizationName: { type: String },
    emailUsed: { type: String },
    passwordUsed: { type: String },
    createdBy:{type:String}
})


const passwordSaver = mongoose.model("password_email_storer", passwordStorage);
module.exports = passwordSaver;