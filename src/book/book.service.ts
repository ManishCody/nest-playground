import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>){}

    async create(input: CreateBookInput): Promise<Book>{
        if (!input.title || input.title.trim() === '') {
            throw new BadRequestException('Title is required and cannot be empty');
        }

        if (!input.author || input.author.trim() === '') {
            throw new BadRequestException('Author is required and cannot be empty');
        }

        if (input.title.length < 3) {
            throw new BadRequestException('Title must be at least 3 characters long');
        }

        const existingBook = await this.bookModel.findOne({ title: input.title }).exec();
        if (existingBook) {
            throw new BadRequestException('A book with this title already exists');
        }

        const created = new this.bookModel(input);
        return created.save();
    }

    async findAll(): Promise<Book[]>{
        return this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book | null>{
        if (!id || id.trim() === '') {
            throw new BadRequestException('Book ID is required');
        }

        const book = await this.bookModel.findById(id).exec();
        
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }

    async update(updateBookInput: UpdateBookInput): Promise<Book | null>{
        if (!updateBookInput.id || updateBookInput.id.trim() === '') {
            throw new BadRequestException('Book ID is required');
        }

        const { id, ...updateData } = updateBookInput;
        const hasUpdateData = Object.values(updateData).some(value => value !== undefined && value !== null);
        
        if (!hasUpdateData) {
            throw new BadRequestException('At least one field must be provided for update');
        }

        if (updateData.title !== undefined && updateData.title.trim() === '') {
            throw new BadRequestException('Title cannot be empty');
        }

        if (updateData.title && updateData.title.length < 3) {
            throw new BadRequestException('Title must be at least 3 characters long');
        }

        if (updateData.author !== undefined && updateData.author.trim() === '') {
            throw new BadRequestException('Author cannot be empty');
        }

        const existingBook = await this.bookModel.findById(id).exec();
        if (!existingBook) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        if (updateData.title) {
            const duplicateBook = await this.bookModel.findOne({ 
                title: updateData.title,
                _id: { $ne: id }
            }).exec();
            
            if (duplicateBook) {
                throw new BadRequestException('A book with this title already exists');
            }
        }

        const updated = await this.bookModel.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        ).exec();

        return updated;
    }

    async delete(id: string): Promise<Book | null>{
        if (!id || id.trim() === '') {
            throw new BadRequestException('Book ID is required');
        }

        const existingBook = await this.bookModel.findById(id).exec();
        if (!existingBook) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return this.bookModel.findByIdAndDelete(id).exec();
    }
}