import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(user.password, salt);
    // user.password = hash;
  }

  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
