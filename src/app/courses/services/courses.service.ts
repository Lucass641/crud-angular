import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
    );
  }

  save(record: Course) {
    return this.httpClient.post<Course>(this.API, record)
  }
}
