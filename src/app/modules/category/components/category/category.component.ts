import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule,MaterialModule,RouterLink,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  
  private categoryservice = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  ngOnInit(): void {
    this.getCategories();
  }
  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource <CategoryElement>();

  getCategories(): void {
     
    this.categoryservice.getCategories()
    .subscribe( (data:any) => {
        
     console.log("respuesta categories: ", data)
     this.processCategoriesResponse(data);

    }, (error:any) => {
      console.log("el error es: " , error)
    })

    }

    processCategoriesResponse(resp: any){

      const dataCategory: CategoryElement[] = [];

      if( resp.metadata[0].code == "00") {

        let listCategory = resp.categoryResponse.category;

        listCategory.forEach((element: CategoryElement) => {
          dataCategory.push(element);
        });

        this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      }

    }

     openCategoryDialog(){

      const dialogRef = this.dialog.open(NewCategoryComponent , {
        width: '450px'
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if( result == 1) {
           this.openSnackBar("Categoria Agregada", "Exitosa");
           this.getCategories();
        } else if (result == 2) {
          this.openSnackBar("Se produjo un error al guardar la categoria", "Error");
        }
      });
    }

    edit(id:number, name: string, description: string) {
      const dialogRef = this.dialog.open(NewCategoryComponent , {
        data: {id: id, name: name, description: description}
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if( result == 1) {
           this.openSnackBar("Categoria Actualizada", "Exitosa");
           this.getCategories();
        } else if (result == 2) {
          this.openSnackBar("Se produjo un error al actualizar la categoria", "Error");
        }
      });
    }

    openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
      return this.snackBar.open(message,action,{
        duration: 2000
      })

    }

     }

  export interface CategoryElement {
    description: string;
    id: number;
    name: string;
  }
