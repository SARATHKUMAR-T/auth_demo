import mongoose from "mongoose";


export interface Users extends mongoose.Document {
  firstName: string,
  lastName: string,
  email: string,
  authProvider: string
  profileImg: string,
  password?: string,
}

const UserSchema = new mongoose.Schema<Users>({
  firstName: {
    type: String,
    required: [true, "First Name Is Required"],
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required"],
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required"]
  },
  password: {
    type: String,
    default: ''
  },
  authProvider: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials"
  },
  profileImg: {
    type: String,
    default: ''
  }

})


export default mongoose.models?.User || mongoose.model<Users>("User", UserSchema)