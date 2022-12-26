const NotificationModel = require('../models/notifications.model');

const saveNotification = (notification, res)=>{
    let newNotification = new NotificationModel(notification).save()
    newNotification
    .then((notification)=>{
        res.status(200).json({
            message: "Notification Sent"
        })
    })
    .catch((error)=>{
        res.status(400).json({
            message: error.message
        })
    }
    )
}

const sendNotification = async (req, res)=>{
    const notification = req.body;
    notification.sender = req.user;
    saveNotification(notification, res)
}

const getUsersNotification = async (req, res)=>{
    const user = req.user;
    NotificationModel.find({receiver: user})
    .then(response => {
        res.json(response)
    })
    .catch((error)=>{
        res.json({
            error: error.message
        })
    })
}

const readNotification = async (req, res)=>{
    const id = req.params.id
    NotificationModel.findByIdAndUpdate(id, {read: true}, {new: true})
    .then(response => {
        res.json(response)
    })
    .catch((error)=>{
        res.json({
            error: error.message
        })
    })
}

const getUnreadNotification = async (req, res)=>{
    const user = req.user;
    NotificationModel.find({receiver: user})
    .then(response => {
        let unread = response.filter(notification => notification.read === true).length
        res.json({
            unread: unread
        })
    })
    .catch((error)=>{
        res.json({
            error: error.message
        })
    })
}


module.exports = {
    sendNotification, getUsersNotification, readNotification, getUnreadNotification, saveNotification}