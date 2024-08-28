import { Injectable, Inject } from '@angular/core';
 
import { DOCUMENT } from '@angular/common';
 
@Injectable({
 
  providedIn: 'root',
 
})
 
export class ToastService {
 
private toastElement: any;
 
  constructor(@Inject(DOCUMENT) private document: Document) {
 
    this.initializeToast();
 
  }
 
  private initializeToast() {
 
    const toastHTML = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000" style="position: fixed; top: 0; right: 0; z-index: 1050; margin-top: 10px; margin-right: 10px;">
 
    <div class="toast-header" style="color: white;">
 
      <strong class="me-auto">Notification</strong>
 
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
 
    </div>
 
    <div class="toast-body"style="color: white;"></div>
 
  </div>`;
 
    // Parse the HTML string and append it to the document body
 
    const toastEl = new DOMParser().parseFromString(toastHTML, 'text/html').body.firstChild;
 
    this.document.body.appendChild(toastEl);
 
    // Save a reference to the toast element
 
    this.toastElement = toastEl;
 
  }
 
  showSuccess(message: string) {
 
    // Update the message
 
    this.toastElement.querySelector('.toast-body').textContent = message;
 
    this.toastElement.querySelector('.toast-header').style.backgroundColor = '#379d00eb'; // Green color
 
    this.toastElement.querySelector('.toast-body').style.backgroundColor = '#379d00eb';
 
    // Show the toast
 
    const toast = new bootstrap.Toast(this.toastElement);
 
toast.show();
 
  }
 
  showFailed(message: string) {
 
    // Update the message
 
    this.toastElement.querySelector('.toast-body').textContent = message;
 
    this.toastElement.querySelector('.toast-header').style.backgroundColor = '#d81a1a';
 
    this.toastElement.querySelector('.toast-body').style.backgroundColor = '#d81a1a';
 
    // Show the toast
 
    const toast = new bootstrap.Toast(this.toastElement);
 
toast.show();
 
  }
 
 
 
}
