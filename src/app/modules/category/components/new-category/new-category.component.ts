import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [RouterModule,MaterialModule,RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit{

  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    
    this.categoryForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]
    })
  }

  onSave(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    this.categoryService.saveCategories(data)
           .subscribe( (data:any ) =>{ 
            console.log(data);
            this.dialogRef.close(1)
           }, (error:any)=> {
            this.dialogRef.close(2)
           })
  }



  onCancel(){
     this.dialogRef.close(3);
  }

}
