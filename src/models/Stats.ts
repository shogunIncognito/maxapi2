import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Stats {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  day: number;

  @Prop({ required: true })
  views: number;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
