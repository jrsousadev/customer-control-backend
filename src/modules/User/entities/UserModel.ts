import mongoose, { Schema } from "mongoose";
import { hash } from 'bcrypt';
import { IUser } from "../interface/IUser";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confidential: {
      email: {
        type: String,
        required: true,
      }
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    listCustomers: {
      type: [
        {
          _id: Schema.Types.ObjectId
        }
      ],
      default: []
    }
  }, 
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 8)
  next();
});

export const UserModel = mongoose.model('users', UserSchema)