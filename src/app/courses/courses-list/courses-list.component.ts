import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import { CORE_ROUTES } from '../../routes/core-routes';
import { SharedModule } from '../../shared/shared.module';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CategoryPipe } from '../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  imports: [SharedModule, AppMaterialModule, CategoryPipe],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router) {}


  onAdd(): void {
      this.router.navigate([CORE_ROUTES.COURSE_FORM]);
    }
}
