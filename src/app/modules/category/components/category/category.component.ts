import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule,MaterialModule,RouterLink,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  
  private categoryservice = inject(CategoryService);
  
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

  }

  export interface CategoryElement {
    description: string;
    id: number;
    name: string;
  }
