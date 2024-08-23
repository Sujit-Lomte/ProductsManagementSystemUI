import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalData } from '../../models/modal-data';
import { Observable } from 'rxjs';

const $ = (window as any)["$"];

@Component({
    selector: 'app-edit-product-dialog',
    templateUrl: './edit-product-dialog.component.html',
    styleUrl: './edit-product-dialog.component.css'
})
export class EditProductDialogComponent {
    ProductForm!: FormGroup;
    submitted = false;

    @ViewChild("modal") modal?: ElementRef;
    data?: any;
    private _onAction = new EventEmitter<any>();

    constructor(private fb: FormBuilder) {
        this.ProductForm = this.fb.group({
            productName: ["", Validators.required],
            productPrice: ["", [Validators.required]],
            productQuantity: ["", [Validators.required]],
        });
    }

    get f() { return this.ProductForm?.controls; }


    open(title: string, data?: any): Observable<any> {
        this.data = { title: title };

        if (data) {
            this.ProductForm.setValue({ productName: data.productName, productPrice: data.productPrice, productQuantity: data.productQuantity });
        }

        $(this.modal?.nativeElement).modal("show");
        return this._onAction.asObservable();
    }

    onSubmit() {
        this.submitted = true;
        if (this.ProductForm?.valid) {
            this.closeDialog();
            this._onAction.next({ formData: this.ProductForm?.value });
            this.ProductForm.reset();
            this.ProductForm.clearValidators();
            this.submitted = false;
        } else {
            this.ProductForm?.markAllAsTouched();
        }
    }

    onCancel(): void {
        this.closeDialog();
        this._onAction.next(null);
    }

    closeDialog() {
        $(this.modal?.nativeElement).modal("hide");
    }
}
