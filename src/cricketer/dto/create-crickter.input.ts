import { InputType, Field, Int } from "@nestjs/graphql";
import { IsOptional, IsString, IsInt } from "class-validator";

@InputType()
export class CreateCricketerInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  country: string;

  @Field()
  @IsString()
  role: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  battingStyle?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bowlingStyle?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  matches?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  runs?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  wickets?: number;
}
