import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { SharedModule } from '../../../shared/shared.module';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  imports: [SharedModule, AppMaterialModule, CategoryPipe],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course)
  }
}
