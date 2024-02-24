import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// declare let Tally: any;

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  document = inject(DOCUMENT)
  loading = false;
  loaded: Promise<void> | null = null;

  // init(): Promise<void> {
  //   this.loading = true;
  //   return this.load().then(() => {
  //     this.loading = false;

  //     Tally.loadEmbeds();
  //   });
  // }

  // private load(): Promise<void> {
  //   if (!this.loaded) {
  //     this.loaded = new Promise<void>((resolve, reject) => {
  //       const script = this.document.createElement('script');
  //       script.type = 'text/javascript';
  //       script.src = 'https://tally.so/widgets/embed.js';

  //       // Error event handling with proper type annotation for the event parameter
  //       script.onerror = (e: Event | string) => {
  //         reject(e instanceof Event ? e : new Error(e.toString()));
  //       };

  //       // Extend HTMLScriptElement interface to include readyState for older IE versions compatibility
  //       interface HTMLScriptElementExtended extends HTMLScriptElement {
  //         readyState?: 'loaded' | 'complete' | 'uninitialized' | 'loading';
  //         onreadystatechange?: () => void; // Correctly include onreadystatechange
  //       }

  //       const scriptExtended = script as HTMLScriptElementExtended;

  //       if (scriptExtended.readyState) {
  //         scriptExtended.onreadystatechange = () => {
  //           if (
  //             scriptExtended.readyState === 'loaded' ||
  //             scriptExtended.readyState === 'complete'
  //           ) {
  //             scriptExtended.onreadystatechange = undefined;
  //             resolve();
  //           }
  //         };
  //       } else {
  //         script.onload = () => {
  //           resolve();
  //         };
  //       }

  //       this.document.body.appendChild(script);
  //     });
  //   }

  //   return this.loaded;
  // }
}
