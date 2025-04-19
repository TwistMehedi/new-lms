import mongoose from "mongoose";

const buySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    ammount: { type: Number, min: 0, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId:{
      type:String,
      required:true
  }
  },
  { timestamps: true }
);

const Buy = mongoose.model("Buy", buySchema);
export default Buy;
