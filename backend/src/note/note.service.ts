import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../schemas/note.schema';
import { NoteDto } from '../dto/noteDto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(NoteDto: NoteDto): Promise<Note> {
    const createdNote = new this.noteModel(NoteDto);
    return createdNote.save();
  }

  async findNoteById(userId:string): Promise<Note[]> {
    console.log(userId);
    
    return this.noteModel.find({ userId }).exec();
  }
}
