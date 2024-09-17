const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");



router.get("/", (req, res) => {
  Notification.find()

    .then((notifications) => res.send(notifications))
    .catch((err) => console.log(err));
});


router.get("/notificationByUser", async (req, res) => {
  try {
    const { user } = req.query;
    const notifications = await Notification.find({ user })
      .populate('user')
 

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/notificationByUserandDate", async (req, res) => {
  try {
    const { user } = req.query;
    const notifications = await Notification.find({
      $and: [
        { user },
        {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              { $dateToString: { format: "%Y-%m-%d", date: new Date() } }
            ]
          }
        }
      ]
    })
      .populate('user')

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/readNotificationByUser/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const notifications = await Notification.updateMany(
      { user: _id, isRead: false },
      { $set: { isRead: true } },
      { new: true }
    )
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/notificationNotReadedExiste", async (req, res) => {

  try {
    const { user } = req.query;
    const count = await Notification.countDocuments({ user, isRead: false });
    res.send(count > 0);
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: 'Erreur lors de la vérification noti not reader' });
  }

});

router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  Notification.findOne({ _id })
    .then((notification) => res.send(notification))
    .catch((err) => console.log(err));
});

// delet
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Notification.findOneAndDelete({ _id: _id })
    .then(() => res.send("success"))
    .catch((err) => console.log(err));
});

router.put("/:_id", (req, res) => {
  let { _id } = req.params;
  Notification.findByIdAndUpdate({ _id }, { $set: { ...req.body } })
    .then(() => res.send("Notification has been updated"))
    .catch((err) => res.send(err));
});


router.put("/visited/visitNotification", async (req, res) => {
  
  try {
    const { _id } = req.body;
    Notification.findByIdAndUpdate({ _id }, { $set: { visited : true} })
    .then(() => res.json(true))
    .catch((err) => res.send(err));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/countNotif/notificationNotReaded", async (req, res) => {
  try {
    const { user } = req.query;
    const count = await Notification.countDocuments({ 
      $and: [
        { user },
        {isRead: false },
        {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              { $dateToString: { format: "%Y-%m-%d", date: new Date() } }
            ]
          }
        }
      ]
  
    });
    res.json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
