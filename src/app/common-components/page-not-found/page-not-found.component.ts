import { Component } from '@angular/core';
import { LocalstorageService } from '../../utilservices/localstorage-service/localstorage.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
constructor(private localstorageService : LocalstorageService){
  this.localstorageService.clear()
}
}
