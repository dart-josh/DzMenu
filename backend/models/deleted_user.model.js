import mongoose from "mongoose";
// import { mainConnection } from "../config/db.js";
import { getMainModel } from "../utils/db.js";

const deletedUserSchema = new mongoose.Schema(
  {
    userDetails: { type: Map },
    deletedDate: { type: Date },
    deletedBy: { type: String },
    reason: { type: String },
  },
  { timestamps: true }
);

// const DeletedUser = mainConnection.model("DeletedUser", deletedUserSchema);
const DeletedUser = await getMainModel("DeletedUser", deletedUserSchema);

export default DeletedUser;
