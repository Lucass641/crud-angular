import { Routes } from '@angular/router';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { CORE_ROUTES } from './routes/core-routes';

export const routes: Routes = [
  {
    path: CORE_ROUTES.HOME,
    pathMatch: 'full',
    redirectTo: 'courses',
  },
  {
    path: CORE_ROUTES.COURSES,
    component: CoursesComponent,
  },
  {
    path: CORE_ROUTES.COURSE_FORM,
    component: CourseFormComponent,
  },
];
