import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CategoryModule
  ]
})
export class DashboardModule { }
