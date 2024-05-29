import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccess(message:string) {
      var x = document.getElementById("snackbar")!;
      x.innerText = message;  // Set the dynamic message
      x.style.background = 'linear-gradient(to right, #00b09b, #96c93d)';  // Set the dynamic background color
      x.className = "show";
      setTimeout(function() {
          x.className = x.className.replace("show", "");
      }, 3000);
  }

  showError(message:string) {
    var x = document.getElementById("snackbar")!;
    x.innerText = message;  // Set the dynamic message
    x.style.background = '#dc3545';  // Set the dynamic background color
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
  }

  showInfo(message:string) {
    var x = document.getElementById("snackbar")!;
    x.innerText = message;  // Set the dynamic message
    x.style.background = '#0dcaf0';  // Set the dynamic background color
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
  }

  showWarning(message:string) {
    var x = document.getElementById("snackbar")!;
    x.innerText = message;  // Set the dynamic message
    x.style.background = '#ffc107';  // Set the dynamic background color
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
  }
}