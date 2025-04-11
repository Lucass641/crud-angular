import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

type CourseForm = {
  _id: FormControl<string | null>;
  name: FormControl<string | null>;
  category: FormControl<string | null>;
};

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, SharedModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup<CourseForm>;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group<CourseForm>({
      _id: new FormControl(''),
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      }),
      category: new FormControl('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const result: Course = await firstValueFrom(
          this.service.save(this.form.value)
        );
        this.onSaveSuccess();
      } catch (error) {
        this.onError();
      }
    } else {
      this.snackBar.open('Por favor, preencha os campos corretamente.', '', {
        duration: 5000,
      });
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName)
    if(field?.hasError('required')) {
      return 'Campo obrigatório'
    }

    if(field?.hasError('minLength')) {
      const requiredLength = field.errors ? field.errors['minLength']['requiredLength'] : 3
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`
    }
    if(field?.hasError('maxLength')) {
      const requiredLength = field.errors ? field.errors['maxLength']['requiredLength'] : 200
      return `Tamanho Máximo excedido de ${requiredLength} caracteres.`
    }
    return 'Campo Inválido'

  }
}
