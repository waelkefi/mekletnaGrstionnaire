const express = require("express");
const router = express.Router();

const Plat = require("../models/Plat");
const User = require("../models/User");
const uploadMulter = require("../middleware/upload");
const validation = require("../middleware/validation");
// add Plat
router.post("/", uploadMulter, validation, async (req, res) => {
  try {
    const { name, price, traiteur, description } = req.body;
    const image = req.file.path;

    const newPlat = new Plat({
      name,
      price,
      traiteur,
      description,
      image,
    });

    const plat = await newPlat.save();
    const platPopulee = await Plat.findById(plat._id).populate('traiteur');

    res.status(201).json(platPopulee);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création du plat");
  }
});


// get All Plat
router.get("/", (req, res) => {
  Plat.find()
    .populate("traiteur")
    .then((plat) => res.send(plat))
    .catch((err) => console.log(err));
});

// get All Plat dispo
router.get("/dispo", (req, res) => {

  const { latitude, longitude,radiusInKm } = req.query;
  User.find({
    location: {
      $geoWithin: {
        $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], parseFloat(radiusInKm) / 6371] // convert radius in kilometers to radians
      }
    }
  })
  .exec((err, users) => {
    if (err) {
      console.log(err);
    } else {
      // Find all plats belonging to the users within the specified radius
      Plat.find({
        traiteur: {
          $in: users.map(user => user._id)
        }
      })
        .populate('traiteur')
        .exec((err, plats) => {
          if (err) {
            console.log(err);
          } else {
            res.send(plats)
          }
        });
    }
  })
});

// get Plat by id
router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  Plat.findOne({ _id })
    .populate("traiteur")
    .then((plat) => res.send(plat))
    .catch((err) => console.log(err));
});

// delete plat
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Plat.findOneAndDelete({ _id: _id })
    .then(() => res.send("success"))
    .catch((err) => console.log(err));
});

router.put("/:_id", (req, res) => {
  let { _id } = req.params;
  Plat.findByIdAndUpdate({ _id }, { $set: { ...req.body } })
    .then(() => res.send("Plat has been updated"))
    .catch((err) => res.send(err));
});

router.get("/findByTrait/:querry", (req, res) => {
  var querry = req.params.querry.toString();
  Plat.find({ traiteur: querry})
    .populate("traiteur")
    .then((plats) => res.send(plats))
    .catch((err) => console.log(err));

});

router.get("/findByTraitAndDispo/:querry", (req, res) => {
  var querry = req.params.querry.toString();
  Plat.find({ traiteur: querry, disponibilite: true })
    .populate("traiteur")
    .then((plats) => res.send(plats))
    .catch((err) => console.log(err));

});

// Count traiteur plat function
async function getPlatCount(traiteurId) {
  try {
    const count = await Plat.countDocuments({ traiteur: traiteurId });
    return count;
  } catch (err) {
    console.error(err);
    throw new Error('Error getting plat count');
  }
}
// count traiteur plat request
router.get('/count/:id/', async (req, res) => {
  try {
  
    const { id } = req.params;
    const count = await getPlatCount(id);
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;