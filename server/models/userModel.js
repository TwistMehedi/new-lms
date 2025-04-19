import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        email: { 
          type: String, 
          required: true, 
          unique: true, 
          lowercase: true,
          match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
        },
        password: { type: String, required: true, minlength: 6 },
        image: {
          public_id: { type: String, default: "" },
          url: { type: String, default: "" },
        },
        enroledCourse:[{type:mongoose.Schema.Types.ObjectId, ref:"Course"}]
},{timestamps:true});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  });

const User = mongoose.model("User", userSchema);
export default User;