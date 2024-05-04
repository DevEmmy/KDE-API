import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 4);
}
