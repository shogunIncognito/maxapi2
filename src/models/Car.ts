import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Car {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: number;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  line: string;

  @Prop({ required: true })
  kilometers: number;

  @Prop({ default: [] })
  images: Array<string>;

  @Prop({ required: true })
  price: number;

  @Prop({ default: '' })
  preview: string;

  @Prop({ required: true })
  fuel: string;

  @Prop({ required: true })
  transmission: string;

  @Prop({ required: true })
  cc: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  owners: number;

  @Prop({ required: true })
  plate: string;

  @Prop({ required: true })
  color: string;

  @Prop({ default: false })
  show: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);
