import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Cricketer {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  role: string; 

  @Field({ nullable: true })
  battingStyle?: string;

  @Field({ nullable: true })
  bowlingStyle?: string;

  @Field(() => Int, { nullable: true })
  matches?: number;

  @Field(() => Int, { nullable: true })
  runs?: number;

  @Field(() => Int, { nullable: true })
  wickets?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
