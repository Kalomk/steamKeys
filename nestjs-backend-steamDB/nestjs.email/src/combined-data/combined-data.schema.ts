// src/schemas/combined-data.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CombinedData {
  @Prop()
  sender: string;

  @Prop()
  description: string;

  @Prop()
  title: string;

  @Prop()
  price: string;

  @Prop()
  Dashboard_id: string;

  @Prop()
  email: string;

  @Prop()
  secretKey: string;
}

export const CombinedDataSchema = SchemaFactory.createForClass(CombinedData);
