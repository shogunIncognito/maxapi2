import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Transaction {
  @Prop({ required: true, ref: 'Buyer' })
  buyer: string;

  @Prop({ required: true, ref: 'Car' })
  car: string;

  @Prop()
  price: string;

  @Prop()
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
