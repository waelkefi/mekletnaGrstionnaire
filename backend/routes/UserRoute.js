const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.error(err));
});


router.get("/traiteur", (req, res) => {
  User.find({ role: "TRAITEUR" })
    .then((users) => res.json(users))
    .catch((err) => console.error(err));
});

router.get("/livreur", (req, res) => {
    User.find({ role: "LIVREUR" })
      .then((users) => res.json(users))
      .catch((err) => console.error(err));
  });

router.post("/", (req, res) => {
  const { userName, password } = req.body;

  User.findOne({ userName }).then(async (user) => {
    if (user) {
      let errors = {};
      if (user.userName === userName) {
        errors = "Login already exists";
      }
      return res.status(400).json(errors);
    } else {


      const newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then((newuser) => res.json(newuser))
            .catch((err) => console.error(err));
        });
      });
    }
  });
});

router.post("/register", (req, res) => {
  const { userName, password } = req.body;

  User.findOne({ userName }).then(async (user) => {
    if (user) {
      let errors = {};
      if (user.userName === userName) {
        errors.userName = "Login already exists";
      }
      return res.status(400).json(errors);
    } else {


      const newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then((newuser) => {

              const payload = {
                id: newuser._id,
              };
              // 3600 secondes = 1 hour
              const expiresInOneDay = 86400;
              jwt.sign(payload, accessTokenSecret, { expiresIn: expiresInOneDay }, (err, token) => {
                if (err) res.sendStatus(500);
                else {

                  res.json({ token, user: newUser });
                }
              });

            })
            .catch((err) => console.error(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { userName, password } = req.body;
  console.log('{ userName, password }',{ userName, password })
  User.findOne({ userName })
    .then((user) => {
      if (!user) res.sendStatus(404);
      else {
        bcrypt.compare(password, user.password).then((isMatched) => {
          if (isMatched) {
            const payload = {
              id: user._id,
            };
            // 3600 secondes = 1 hour
            const expiresInOneDay = 86400;
            jwt.sign(payload, accessTokenSecret, { expiresIn: expiresInOneDay }, (err, token) => {
              if (err) res.sendStatus(500);
              else {
                console.log('here')
                res.json({ token: token, role: user.role });
              }
            });
          } else res.sendStatus(400);
        });
      }
    })
    .catch((err) => res.send("Server error"));
});

router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);


router.get("/:id", (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  User.findOneAndDelete({ _id: _id })
    .then(() => res.send("success"))
    .catch((err) => console.log(err));
});


router.put("/:_id", (req, res) => {
  let { _id } = req.params;
  User.findByIdAndUpdate({ _id }, { $set: { ...req.body } } , { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

router.put("/address/:_id", (req, res) => {
  let { _id } = req.params;
  User.findByIdAndUpdate({ _id }, { $set: { location: req.body } })
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

router.put("/password/:_id", (req, res) => {
  let { _id } = req.params;
  let { actualPassword, newPassword } = req.body;
  User.findById({ _id })
    .then((user) => {
      if (!user) res.sendStatus(404);
      else {
        bcrypt.compare(actualPassword, user.password).then((isMatched) => {
          if (isMatched) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, hash) => {
                User.findByIdAndUpdate({ _id }, { $set: { password: hash } })
                  .then((user) => res.send(user))
                  .catch((err) => res.send(err));
              });
            });
          } else res.sendStatus(400);
        });
      }
    })
    .catch((err) => res.send("Server error"));
});

router.put("/loginAndPassword/:_id", (req, res) => {
  let { _id } = req.params;
  let { actualPassword, newPassword ,userName} = req.body;
  User.findById({ _id })
    .then((user) => {
      if (!user) res.sendStatus(404);
      else {
        bcrypt.compare(actualPassword, user.password).then((isMatched) => {
          if (isMatched) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, hash) => {
                User.findByIdAndUpdate({ _id }, { $set: { password: hash,  userName  } } , { new: true })
                  .then((user) => res.json({error: false , user}))
                  .catch((err) => res.send(err));
              });
            });
          } else res.json({error: true , "message" : "wrong password"});
        });
      }
    })
    .catch((err) => res.send("Server error"));
});

module.exports = router;
