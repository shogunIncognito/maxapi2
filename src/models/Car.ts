import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Car {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: number;

  @Prop({ required: true })
  kilometers: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: [] })
  images: Array<string>;

  @Prop({ required: true, default: '' })
  preview: string;

  @Prop({ default: '' })
  description: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
