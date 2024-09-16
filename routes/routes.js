// import { Router } from "express";
// import User from "../models/User.js";
// const route = Router();

// const salt = 12;

// route.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user)
//       return res.status(401).json({
//         message: "Incorrect username or password",
//       });

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch)
//       return res.status(401).json({
//         message: "Incorrect username or password",
//       });
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "14d",
//     });
//     res.cookie("jwt", token, {
//       sameSite: "None",
//       secure: true,
//     });
//     res.json({ message: "success", jwt_token: token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// route.post("/api/register", (req, res) => {
//   const newUser = new user(req.body);
//   console.log(req.body);
//   bcrypt.genSalt(salt, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       newUser.password = hash;
//       console.log(newUser);
//       newUser
//         .save()
//         .then((data) => {
//           console.log(data);
//           res.send({ message: "success" });
//         })
//         .catch((error) => {
//           res.send({ message: "user already exist" });
//         });
//     });
//   });
// });

// export default route;
