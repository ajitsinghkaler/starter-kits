import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStore {
  isMenuOpen = false;

  closeMenu() {
    this.isMenuOpen = false;
  }

}
