import { Mongoose } from 'mongoose';

export interface UserToSign {
  userId: string | Mongoose.Types.ObjectId;
  username: string;
  role: Role;
  image?: string;
}
