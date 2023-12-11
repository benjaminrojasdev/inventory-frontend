import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  estadoFormulario: string = "";
  public categoryForm!: FormGroup;
  public data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  

  ngOnInit(): void {
    
    console.log(this.data);
    this.estadoFormulario = "Agregar";

    this.categoryForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]
    })
    if (this.data !=null) {
       this.updateForm(this.data);
       this.estadoFormulario = "Actualizar"
    }
  }

  onSave(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    if (this.data != null){
     this.categoryService.updateCategories(data, this.data.id)
             .subscribe((data: any) => {
               this.dialogRef.close(1);
             }, (error:any)=> {
               this.dialogRef.close(2);
             })
    } else {
      this.categoryService.saveCategories(data)
             .subscribe( (data:any ) =>{ 
                 console.log(data);
                 this.dialogRef.close(1)
             }, (error:any)=> {
                 this.dialogRef.close(2)
      })
    }
  
  }



  onCancel(){
     this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name,Validators.required],
      description: [data.description,Validators.required]
    })
  }
}
