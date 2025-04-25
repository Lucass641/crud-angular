import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';
import { FormUtilsService } from './../../shared/form/form-utils.service';

type CourseForm = {
  _id: FormControl<string | null>;
  name: FormControl<string | null>;
  category: FormControl<string | null>;
  lesson: FormArray<
    FormGroup<{
      id: FormControl<string | null>;
      name: FormControl<string | null>;
      youtubeUrl: FormControl<string | null>;
    }>
  >;
};

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, SharedModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup<CourseForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group<CourseForm>({
      _id: new FormControl(course._id),
      name: new FormControl(course.name, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      }),
      category: new FormControl(course.category, {
        validators: [Validators.required],
      }),
      lesson: this.formBuilder.array(
        this.retrieveLessons(course),
        Validators.required
      ),
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lesson) {
      course.lesson.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        },
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(11),
          ],
        },
      ],
    });
  }

  getLessonsFromArray() {
    return (<UntypedFormArray>this.form.get('lesson')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lesson') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lesson') as UntypedFormArray;
    lessons.removeAt(index);
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const result: Course = await firstValueFrom(
          this.service.save(this.form.value as Partial<Course>)
        );
        this.onSaveSuccess();
      } catch (error) {
        this.onError();
      }
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private onSaveSuccess() {
    this.showSnackBar('Curso salvo com sucesso!');
    this.onCancel();
  }

  private onError() {
    this.showSnackBar('Erro ao salvar curso.');
  }
}
