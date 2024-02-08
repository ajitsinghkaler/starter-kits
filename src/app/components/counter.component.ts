import { Component } from '@angular/core';
import { signalState, patchState } from '@ngrx/signals';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    Count: {{ state.count() }} 

    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  state = signalState({ count: 0 });

  increment() {
    patchState(this.state, (state) => ({ count: state.count + 1 }));
  }

  decrement() {
    patchState(this.state, (state) => ({ count: state.count - 1 }));
  }

  reset() {
    patchState(this.state, { count: 0 });
  }
}