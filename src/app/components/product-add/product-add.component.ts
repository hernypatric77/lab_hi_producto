import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  constructor(
    private productsService: ProductsService
  ) {}

  public onAddEmployee(addForm: NgForm): void {
    const element =document.getElementById('add-employee-form');
    if (element) {
      element.click();
    } else {
      console.error('Elemento no encontrado'); // Opcional: Manejar el caso en el que el elemento no se encuentra
    }
   /*
    this.productsService.create(addForm.value).subscribe(
     (response: Employee) => {
      console.log(response);
      this.getEmployees();
      addForm.reset();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
       addForm.reset();
     }
   );
   */
  }
}
