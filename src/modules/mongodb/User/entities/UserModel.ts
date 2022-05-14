import mongoose, { Schema } from "mongoose";
import { hash } from 'bcrypt';
import { IUserSpecification } from "../../../../specifications/user-specification";
import { UserPermissionsTypes, UserRolesTypes } from "../../../../shared/utils/constants";

const UserSchema = new Schema<IUserSpecification>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      enum: UserPermissionsTypes,
      default: [UserPermissionsTypes.WITHOUT]
    },
    roles: {
      type: [String],
      enum: UserRolesTypes,
      default: [UserRolesTypes.USER],
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
          customerId: {
            type: Schema.Types.ObjectId,
            ref: 'customers'
          }
        }
      ],
      default: []
    },
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