import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AppMaterialModule } from './app-material/app-material.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    AppMaterialModule
  ],
})
export class SharedModule { }
