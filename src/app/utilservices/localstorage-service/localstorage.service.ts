import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {

  private namespace = 'SITES_';

  constructor(){}

  setItem(key: string, value: any): void {
    localStorage.setItem(this.namespace + key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(this.namespace + key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.namespace + key);
  }

  clear(): void {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.namespace)) {
        localStorage.removeItem(key);
      }
    });
  }
}
