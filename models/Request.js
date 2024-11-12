import mongoose from "mongoose";

const RequestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", RequestSchema);
export default Request;
