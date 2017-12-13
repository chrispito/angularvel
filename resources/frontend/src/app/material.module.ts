import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatCheckboxModule, 
  MatFormFieldModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class MaterialModule { }