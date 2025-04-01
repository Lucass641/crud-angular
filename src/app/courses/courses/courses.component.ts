import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CORE_ROUTES } from '../../routes/core-routes';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SharedModule, CategoryPipe, AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}
  onAdd(): void {
    this.router.navigate([CORE_ROUTES.COURSE_FORM]);
  }
}
