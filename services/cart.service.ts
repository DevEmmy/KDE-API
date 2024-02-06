import { NotFoundError } from "../helpers/error-responses";
import { ICart } from "../interfaces/model/cart.interface";
import { IListing } from "../interfaces/model/listing.interface";
import { IUser } from "../interfaces/model/user.interface";
import Cart from "../models/cart.model";

export class CartService {
  constructor() {}

  public initiateCart = async (userId: string): Promise<ICart> => {
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "collectibles",
      populate: {
        path: "itemData",
        populate: ["category", "postedBy"],
      },
    });

    if (cart) {
      return cart;
    } else {
      let newCart = new Cart({ user: userId });
      return await newCart.save();
    }
  };

  public addToCart = async (
    userId: string,
    collectibleId: string
  ): Promise<ICart | null> => {
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "collectibles",
      populate: {
        path: "itemData",
        populate: ["category", "postedBy"],
      },
    });

    if (!cart) throw new NotFoundError("cart does not exist");

    let index = cart.collectibles.findIndex(
      (item) =>
        String((item.itemData as IListing)._id) === String(collectibleId)
    );
    if (index !== -1) {
      cart.collectibles[index].quantity += 1;
    } else {
      cart.collectibles.push({
        itemData: collectibleId,
        quantity: 1,
      });
    }

    cart = await Cart.findByIdAndUpdate(cart._id, cart, { new: true });
    return cart;
  };

  public deleteFromCart = async (userId: string, collectibleId: string) => {
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "collectibles",
      populate: {
        path: "itemData",
        populate: ["category", "postedBy"],
      },
    });

    if (!cart) throw new NotFoundError("cart does not exist");

    let index = cart.collectibles.findIndex(
      (item) =>
        String((item.itemData as IListing)._id) === String(collectibleId)
    );

    if (index !== -1) {
      cart.collectibles[index].quantity -= 1;
    } else {
    }
    cart = await Cart.findByIdAndUpdate(cart._id, cart, { new: true });

    return cart;
  };
  public getCart = async (userId: string): Promise<IUser[]> => {
    return await Cart.find({ user: userId }).populate({
      path: "collectibles",
      populate: {
        path: "itemData",
        populate: ["category", "postedBy"],
      },
    });
  };

  public clearCart = async (userId: string) => {
    let cart: Partial<ICart> = {};
    cart.collectibles = [];
    let carts = await Cart.findOneAndUpdate({ user: userId }, cart, {
      new: true,
    });
    return carts;
  };

  public deleteMultiple = async (userId: string, collectibleId: string) => {
    let cart = await Cart.findOne({ user: userId }).populate({
      path: "collectibles",
      populate: {
        path: "itemData",
        populate: ["category", "postedBy"],
      },
    });

    if (!cart) throw new NotFoundError("cart does not exist");

    let index = cart.collectibles.findIndex(
      (item) =>
        String((item.itemData as IListing)._id) === String(collectibleId)
    );

    cart.collectibles.splice(index, 1);
    cart = await Cart.findByIdAndUpdate(cart._id, cart, { new: true });

    return cart;
  };
}
