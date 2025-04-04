import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, SharedModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const result: any = await firstValueFrom(
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

  private onSaveSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}
