import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatCardModule, MatMenuModule, MatInputModule, MatCheckboxModule, MatSelectModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatTabsModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule, 
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule, 
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class MaterialModule { }