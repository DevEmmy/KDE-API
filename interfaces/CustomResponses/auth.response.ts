import { IUser } from "../model/user.interface";

export interface ILoginRes {
  user: IUser;
  accessToken: string;
}
