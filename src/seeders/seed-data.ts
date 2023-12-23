import User from "../models/user.model";
import { users } from "./user";

export default async function seedData() {
  await User.deleteMany({});
  await User.create(users);
  console.log("seeded");
}
