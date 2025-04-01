import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, SharedModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }
  ngOnInit(): void {}
}
