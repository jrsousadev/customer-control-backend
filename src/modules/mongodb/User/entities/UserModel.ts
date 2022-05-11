import mongoose, { Schema } from "mongoose";
import { hash } from 'bcrypt';

export interface IListCustomers {
  customerId: mongoose.Types.ObjectId
}

/* export interface IListMounthBillings {
  mounthId: mongoose.Types.ObjectId
}*/

export interface IConfidential {
  email: string;
}

export interface IUser extends Document {
  name: string;
  password: string;
  confidential: IConfidential;
  isAdmin: boolean;
  listCustomers: IListCustomers[];
/*   listMounthBillings: IListMounthBillings[]; */
}

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
          customerId: {
            type: Schema.Types.ObjectId,
            ref: 'customers'
          }
        }
      ],
      default: []
    },
/*     listMounthBillings: {
      type: [
        {
          billingId: {
            type: Schema.Types.ObjectId,
            ref: 'billingPerMounth'
          }
        }
      ]
    } */
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