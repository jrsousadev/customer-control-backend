import mongoose, { Schema } from "mongoose";
import { ICustomer } from "../interface/ICustomer";

const CustomerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
    },
    responsibleName: {
      type: String,
      required: true,
    },
    contact: {

      email: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      }

    },
    contract: {

      userResponsible:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      value:{
        type: Number,
        required: true,
      },
      dueDate:{
        type: Date,
        required: true,
      },
      paymentMethod: {
        type: String,
        default: 'semetral'
      },
      serviceStart: {
        type: Date,
        required: true,
      }

    }
  }, 
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

export const CustomerModel = mongoose.model('customers', CustomerSchema)