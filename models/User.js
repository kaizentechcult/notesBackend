// import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  name: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
    select: false,
  },
  OTP: {
    type: String,
    // required: false,
  },
  verified: {
    type: Boolean,
    // required: true,
    default: false,
  },
});
// UserSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(user.password, salt);
//   user.password = hash;
//   next();
// });

const User = mongoose.model("User", UserSchema);
export default User;
