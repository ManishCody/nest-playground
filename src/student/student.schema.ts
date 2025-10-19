import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentDocument = Student & Document;

@Schema({timestamps: true})
export class Student {
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    age: number;
}

export const studentSchema = SchemaFactory.createForClass(Student);

