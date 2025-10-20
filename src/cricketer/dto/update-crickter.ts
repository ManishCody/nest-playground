import { InputType, Field, PartialType } from "@nestjs/graphql";
import { CreateCricketerInput } from "./create-crickter.input";

@InputType()
export class UpdateCricketerInput extends PartialType(CreateCricketerInput) {
  @Field()
  id: string;
}
