import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.statics.signup = async function (username, email, password) {
  if (!email || !password || !username) {
    throw Error("All fields are must.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Provided email is incorrect.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak.");
  }

  const existsEmail = await this.findOne({ email });
  if (existsEmail) {
    throw Error("Email is already being used.");
  }

  const existsUsername = await this.findOne({ username });
  if (existsUsername) {
    throw Error("Username is in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!password || !username) {
    throw Error("All fields are must.");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username provided.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

export default mongoose.model("User", userSchema);
