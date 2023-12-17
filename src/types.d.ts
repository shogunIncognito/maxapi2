import { Mongoose } from 'mongoose';

export interface UserToSign {
  _id: string | Mongoose.Types.ObjectId;
  username: string;
  role: Role;
  image?: string;
}
