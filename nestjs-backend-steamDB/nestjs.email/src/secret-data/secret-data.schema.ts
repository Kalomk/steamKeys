import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface SecretData {
  email: string;
  secretKey: string;
}

@Schema()
export class PostSecret {
  @Prop()
  secretKey: string;

  @Prop()
  email: string;
}

export const PostSecretSchema = SchemaFactory.createForClass(PostSecret);
