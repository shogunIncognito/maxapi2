import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Brand {
  @Prop({ required: true })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
