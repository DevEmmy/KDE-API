const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    message : String,
    type: {type: Number},
    link: String,
    read: {type:Boolean, default:false},
    receiver: {type: Schema.Types.ObjectId, ref: "User"}
},
    {
        timestamps: true
    }
)

const NotificationModel = mongoose.model("NotificationModel", notificationsSchema)

module.exports =  NotificationModel;