import mongoose, { Types } from "mongoose";
import { ICart } from "../interfaces/model/cart.interface";
import { Collections } from "../interfaces/collections";

export const CartSchema = new mongoose.Schema<ICart>({
  user: { type: Types.ObjectId, ref: Collections.user, required: true },
  collectibles: {
    type: [{ itemData: { type: Types.ObjectId, ref: Collections.listing } }],
    default: [],
  },
});

const Cart = mongoose.model(Collections.cart, CartSchema);
export default Cart;
