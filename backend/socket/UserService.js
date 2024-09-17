const UserSocket = require("../models/UserSocket");


async function saveSocketIdForUser({ userId, socketId, token }) {
    try {
        const existingUserSocket = await UserSocket.findOne({ userId, socketId });
        if (!existingUserSocket) {
            const userSocket = new UserSocket({ userId, socketId, token });
            await userSocket.save();
            // console.log("User socket information saved:", userSocket);
        }
    } catch (err) {
        console.error("Error saving user socket information:", err);
        throw err;
    }

}

async function removeSocketIdForUser({ userId, socketId }) {
    try {
        await UserSocket.findOneAndDelete({ userId, socketId });
        console.log("Deleted user socket:", userId, socketId);
    } catch (err) {
        console.error("Error deleting user socket:", err);
        throw err;
    }
}

// Function to get all user sign-in information by userId
async function getUserSignIn(userId) {
    try {
        const userSignIns = await UserSocket.find({ userId });
        // console.log(userSignIns)
        return userSignIns; 
    } catch (error) {
        console.error(`Error fetching sign-in data for user ${userId}:`, error);
        throw error;
    }
}



module.exports = { saveSocketIdForUser, removeSocketIdForUser ,getUserSignIn  };