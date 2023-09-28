import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Product, UpdateProductDTO } from '../../models/product.model';


import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  cantidad = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: ''
  };
  limit = 5;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  titleId = '';
  product : Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: ''
  };
  currentIndex = -1;


  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {

    this.productsService.getProductsByPage(5, 0)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  }




  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {
        title: 'change',
        price: 0,
        images: [],
        description: ''
      })),
    )
    .subscribe(data => {
      console.log(data);
    });
    this.productsService.fetchReadAndUpdate(id, {
      title: 'change',
      price: 0,
      images: [],
      description: ''
    })
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: Product = {
      title: 'Nuevo prodcuto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      id: 'trj-crd'
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
      price: 0,
      images: [],
      description: ''
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  searchTitle(): void {

    this.currentIndex = -1;

    this.productsService.getProduct(this.titleId)
      .subscribe({
        next: (data) => {
          this.product = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  setActiveTutorial(tutorial: Product, index: number): void {
    this.productChosen = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {

  }

  public onOpenModal(employee: Product, mode: String) : void{

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if(mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
/*
    if(mode === 'edit'){
      this.updateProduct = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }

    if(mode === 'delete'){
      this.deleteProduct = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }*/

    container?.appendChild(button);
    button.click();
  }

  public onCreate( ) : void{
    console.log('ingreso');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#addEmployeeModal');
    container?.appendChild(button);
    button.click();
  }
  onSeleccionChange(event: any) {
    this.cantidad = event.target.value;
    console.log(this.cantidad);
    this.productsService.getProductsByPage(this.cantidad, 0)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  }



}
