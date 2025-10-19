import { IsInt, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    name: string;
    @IsInt()
    age: number;
    @IsInt()
    id: number;
}