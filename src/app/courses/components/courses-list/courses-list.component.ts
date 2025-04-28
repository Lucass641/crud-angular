import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';


import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-courses-list',
  imports: [CategoryPipe, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course)
  }

  onDelete(course: Course) {
    this.remove.emit(course)
  }
}
