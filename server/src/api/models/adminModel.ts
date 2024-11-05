import { model, Schema } from "mongoose";
import { IAdmin } from "../../types/AdminTypes";


const AdminSchema = new Schema<IAdmin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

export default model<IAdmin>('Admin', AdminSchema);