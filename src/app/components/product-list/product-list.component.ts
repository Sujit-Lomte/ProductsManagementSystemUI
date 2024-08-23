import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductData } from '../../models/product-data';
import { ModalData } from '../../models/modal-data';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-Product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  Products: ProductData[] = [];

  @ViewChild(ConfirmationDialogComponent) confirmation?: ConfirmationDialogComponent;
  @ViewChild(EditProductDialogComponent) ProductEditor?: EditProductDialogComponent;


  constructor(private ProductService: ProductService, private notification: NotificationService) {

  }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.ProductService.getAllProducts().subscribe({
      next: (result: ApiResponse) => {
        this.Products = result.data;
      }
    });
  }

  addProduct() {
    const data: ModalData = {
      title: "Create Product"
    }

    const subscription = this.ProductEditor?.open("Create Product").subscribe({
      next: (form: any) => {
        form.formData.id = this.getMaxId();
        this.ProductService.addProduct(form.formData).subscribe({
          next: (response: ApiResponse) => {
            this.notification.success("Product created successfully");
            this.Products.push(response.data);
          }
        });
        subscription?.unsubscribe();
      }
    });
  }

  editProduct(Product: ProductData) {
    const subscription = this.ProductEditor?.open("Update Product", Product).subscribe({
      next: (form: any) => {
        form.formData.id = Product.id;
        this.ProductService.updateProduct(Product.id, form.formData).subscribe({
          next: (response: ApiResponse) => {
            if (response.success) {
              this.notification.success("Product updated successfully");
              const index = this.Products.findIndex(c => c.id === Product.id);
              this.Products.splice(index, 1, response.data);
            }
          }
        });
        subscription?.unsubscribe();
      }
    });
  }


  deleteProduct(ProductId: number) {
    const data: ModalData = {
      title: "Confirmation",
      content: "Are you sure, you want to delete this Product?",
    }

    const subscription = this.confirmation?.open(data).subscribe({
      next: (yes: boolean) => {
        if (yes) {
          this.ProductService.deleteProduct(ProductId).subscribe({
            next: (response: ApiResponse) => {
              if (response.success) {
                this.notification.success("Product deleted successfully");
                const index = this.Products.findIndex(c => c.id === ProductId);
                this.Products.splice(index, 1)
              }
            }
          })
        }
        subscription?.unsubscribe();
      }
    });
  }

  getMaxId() {
    let id = 0;
    if (this.Products.length) {
      var lastProduct = this.Products[this.Products.length - 1];
      id = lastProduct?.id;
    }
    return Number(id) + 1;
  }
}
