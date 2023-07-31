import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CombinedData {
  @Field()
  sender: string;
  @Field()
  description: string;
  @Field()
  title: string;
  @Field()
  price: string;
  @Field()
  Dashboard_id: string;
  @Field()
  email: string;
  @Field()
  secretKey: string;
}
@ObjectType()
export class ItemBuyed {
  @Field()
  price: string;
  @Field()
  Dashboard_id: string;
  @Field()
  description: string;
  @Field()
  title: string;
  @Field()
  buyerEmail: string;
  @Field()
  email: string;
}
