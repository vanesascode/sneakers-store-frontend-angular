import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  totalRecords: number = 0;

  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  url: string = import.meta.env['NG_APP_API'];

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) return;
    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    image: '',
    name: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) return;

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPagination() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(this.url, {
        page,
        perPage,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService.editProduct(this.url + id, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPagination();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(this.url + id).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPagination();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(this.url, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPagination();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}

//we subscribe to the observable that the 'getProducts' method returns
