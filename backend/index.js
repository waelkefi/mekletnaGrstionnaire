const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const connectDB = require("./config/connectDB");
const http = require("http");
const socketIO = require("socket.io");
const fetch = require('node-fetch');

const app = express();

const server = http.createServer(app);
module.exports = io = socketIO(server);


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));

//Passport Configuration
require("./middleware/passport")(passport);
connectDB();

const userRoute = require("./routes/UserRoute");
const livraisonRoute = require("./routes/LivraisonRoute");
const commandeRoute = require("./routes/CommandeRoute");
const platRoute = require("./routes/PlatRoute");
const notificationRoute = require("./routes/NotificationRoute");
const clientRoute = require("./routes/ClientRoute")
const TraiteurRoute = require("./routes/TraiteurRoute")
const PlanificationRoute = require("./routes/PlanificationRoute")
const EnvieClientRoute = require('./routes/EnvieClientRoutes')
const circuitRoute = require('./routes/CircuitRoutes')
const { saveSocketIdForUser, removeSocketIdForUser } = require("./socket/UserService");


app.use("/api/user", userRoute);
app.use("/api/livraison", livraisonRoute);
app.use("/api/commande", commandeRoute);
app.use("/api/plat", platRoute);
app.use("/api/client", clientRoute)
app.use("/api/traiteur", TraiteurRoute)
app.use("/api/planification", PlanificationRoute)
app.use("/api/envieClient", EnvieClientRoute)
app.use("/api/notification", notificationRoute);
app.use('/api/circuit', circuitRoute)
app.get('/api/get-distances', async (req, res) => {
  try {
    // Récupérez les paramètres de la requête
    const { origin, destinations } = req.query;

    // Vérifiez la validité des paramètres
    if (!origin || !Array.isArray(origin) || !destinations || !Array.isArray(destinations)) {
      return res.status(400).json({ error: 'Les paramètres d\'origine ou de destination sont manquants ou incorrects.' });
    }

    // Remplacez la clé API par la vôtre
    const apiKey = 'AIzaSyAp3w6NWTgtKnNiU7igiPQxyGqbgul-HI4';

    // Créez une chaîne de destinations en les joignant avec le séparateur '|'
    const destinationString = destinations.join('|');
    // Créez une chaîne d'origines en les joignant avec le séparateur '|'
    const originString = origin.join('|');

    // Construisez l'URL de l'API Google Maps Distance Matrix
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originString}&destinations=${destinationString}&key=${apiKey}`;

    // Effectuez la requête à l'API Google Maps
    const response = await fetch(url);

    // Vérifiez si la réponse est réussie (status 200)
    if (!response.ok) {
      throw new Error(`La requête a échoué avec le statut ${response.status}`);
    }

    // Parsez les données JSON de la réponse
    const data = await response.json();

    // Envoyez les données en réponse
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des distances:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des distances.' });
  }
});

io.on("connect", (socket) => {

  console.log(`Client connected: ${socket.id}`);
  // Listen for login events from clients
  socket.on("login", async ({ userId, token }) => {
    // console.log("token", token)
    await saveSocketIdForUser({ userId, socketId: socket.id, token });

  });

  // Handle disconnect event
  socket.on("disconnectUser", (userId) => {
    console.log("Client disconnected", userId);
    removeSocketIdForUser(userId);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on http://localhost:${port}`);
});
