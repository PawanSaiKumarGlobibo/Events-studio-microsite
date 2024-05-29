import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  applyheaderTheme!:string;

  applyheaderTheme$ =  new BehaviorSubject<string>('')

  constructor() { }

  upDateThemeChanged(val:string){
   this.applyheaderTheme = val;
   this.applyheaderTheme$.next(this.applyheaderTheme)
  }

}
