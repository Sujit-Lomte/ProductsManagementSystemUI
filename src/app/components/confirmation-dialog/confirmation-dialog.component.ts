import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalData } from '../../models/modal-data';
import { Observable } from 'rxjs';

const $ = (window as any)["$"];

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  @ViewChild("modal") modal?: ElementRef;

  private _onAction = new EventEmitter<boolean>();

  data?: ModalData;

  ngOnInit() {
  }

  open(data: ModalData): Observable<boolean> {

    this.data = data;

    $(this.modal?.nativeElement).modal("show");

    return this._onAction.asObservable();
  }

  close(success: boolean) {
    $(this.modal?.nativeElement).modal("hide");
    this._onAction.next(success);
  }
}
