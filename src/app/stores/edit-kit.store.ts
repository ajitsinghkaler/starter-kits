import { Injectable } from '@angular/core';
import { StarterKit } from '../models/starter-kit';

@Injectable({
  providedIn: 'root',
})
export class EditKitStore {
  kit: null | StarterKit = null;
  setKitNull() {
    this.kit = null;
  }
  setKit(kit: StarterKit) {
    this.kit = kit;
  }
}
