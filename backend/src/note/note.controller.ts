

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from 'src/dto/noteDto';


@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('createnote')
  async create(@Body() createNote: NoteDto) {
    console.log(createNote);
    
    return this.noteService.create(createNote);
  }

  @Get('noteById/:id') 
  async findNoteById(@Param('id') id: string) {
    console.log("Received id:", id);
    return this.noteService.findNoteById(id);
  }
}
