import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    ConfirmationDialogComponent
  ],
})
export class SharedModule { }
