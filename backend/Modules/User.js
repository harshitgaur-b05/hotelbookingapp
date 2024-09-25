import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  country: {
    type: String,
    
  },
  img: {
    type: String,
  },
  city: {
    type: String,

  },
  phone: {
    type: String,
    
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Check if the model already exists before compiling it again
export default mongoose.models.User || mongoose.model("User", UserSchema);
