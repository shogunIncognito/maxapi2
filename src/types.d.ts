import { Mongoose } from 'mongoose';

export interface UserToSign {
  _id: string | Mongoose.Types.ObjectId;
  username: string;
  role: Role;
  image?: string;
}

export interface QueryCar {
  page: number;
  limit: number;
  search?: string;
  show?: string;
  sold?: string;
}
