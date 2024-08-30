import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Role } from 'src/enums';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: Role.admin })
  role: Role;

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
