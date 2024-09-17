const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notification = require('./Notification');
const io = require('../index');
const { getUserSignIn } = require("../socket/UserService");
const { sendPushNotification } = require("../socket/PushNotification");

const livraisonSchema = new Schema({
    livreur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    circuit: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Commande"
        }
    ]

});

// envoyer une notification au livreur
livraisonSchema.post("save", async function (livraison) {

    try {
        const title = "Mekletna"
        const message = "Vous Avez Un nouveau circuit"
        const notification = new Notification({
            message: message,
            user: livraison.livreur,
            livraison: livraison._id,
        });

        await notification.save();
        //console.log(order.client.toHexString())
        // array of users because it can be connected in multiple devices
        const userSignIns = await getUserSignIn(livraison.livreur);
   
        if (userSignIns.length > 0) {
            await userSignIns.map(user => {
                io.to(user.socketId).emit('notification', notification);
                sendPushNotification(user.token, title, message)
            })

        }
        else {
            console.log('no users connected');
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = Livraison = mongoose.model("Livraison", livraisonSchema);