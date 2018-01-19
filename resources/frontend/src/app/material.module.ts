import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule, MatCheckboxModule, MatSelectModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatToolbarModule,
    MatCardModule, 
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class MaterialModule { }