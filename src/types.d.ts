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

// solo tipando los datos necesarios
export interface OpenAIResponse {
  choices: [
    {
      message: string;
      model: string;
    },
  ];
}
