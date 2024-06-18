import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Buyer {
  @Prop({ required: true })
  cc: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
