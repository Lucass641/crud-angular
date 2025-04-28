import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

import { CORE_ROUTES } from '../../../routes/core-routes';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SharedModule, AppMaterialModule, CoursesListComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of( { courses: [], totalElements: 0, totalPages: 0 });
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

  onEdit(course: Course) {
    this.router.navigate([CORE_ROUTES.COURSE_EDIT, course._id]);
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id!).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error: (error) => {
            this.onError('Erro ao tentar remover curso.');
          },
        });
      }
    });
  }
}
