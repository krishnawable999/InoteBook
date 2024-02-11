const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "krishnaiswablepatil";
// Route 1:  Create a user using :POST "/api/auth/createuser". // No login requrie

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "pass must be 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // chevk for user already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      // if user already exists then show the error message
      if (user) {
        return res.status(400).json({success, error: "this user exists already" });
      }
      // create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(data, JWT_SECRET);
      //   res.json(user);
      success = true;
      res.json({success, auth_token });
    } catch (error) {
      // showing the error
      console.log(error.message);
      res.status(500).send("Inernal server error occured");
    }
  }
);

// Route 2: Create a user using :POST "/api/auth/login". // No login requrie

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body('password','password cannot blank').exists(),

],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
          success = false;
            return res.status(400).json({error: "Try to login wiht correct information"});
        }
        // this function compares the login string
        const passwordCompare = await  bcrypt.compare(password, user.password);
        if(!passwordCompare){
          success = false;
            return res.status(400).json({success, error: "Try to login wiht correct information"});
        }
        const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success, authtoken });
    } catch (error) {
        // showing the error
      console.log(error.message);
      res.status(500).send("Inernal server error occured");
    }
  }
);

// Route 3: Get loggedin user Details :POST "/api/auth/getuser". // login requried
router.post('/getuser',fetchuser, async (req,res)=>{
  
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // showing the error
  console.log(error.message);
  res.status(500).send("Inernal server error occured");
}
});
module.exports = router;
