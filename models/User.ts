import mongoose, { models } from "mongoose";


export interface Users extends mongoose.Document {
  firstName: string,
  lastName: string,
  email: string,
  authProvider: string
  profileImg: string,
  password?: string,
}

const userSchema = new mongoose.Schema<Users>({
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

const User = models?.User || mongoose.model<Users>("User", userSchema)

export default User