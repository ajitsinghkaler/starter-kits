import { Component } from '@angular/core';
import { StarterKitCardsComponent } from "./starter-kit-cards.component";

@Component({
    selector: 'app-similar-kits',
    standalone: true,
    template: `
    <div class="container mx-auto">
    <h1>Similar Kits</h1>
    <div class="grid grid-cols-4 gap-6">
    @for (item of items; track $index) {
      <app-starter-kit-cards [starterKitData]="item"></app-starter-kit-cards>
    }
    </div>
    </div>
  `,
    styles: ``,
    imports: [StarterKitCardsComponent]
})
export class SimilarKitsComponent {
  items = [
    {
      id: 1,
      name: 'Ultimate Developer Kit',
      description: 'A comprehensive kit for software development enthusiasts.',
      image: 'https://everlogue.aicygnus.com/android-chrome-192x192.png',
      tags: ['development', 'software', 'programming'],
      website: 'https://developerkit.com',
      pricing: '$99.99',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Home Gardening Starter',
      description: 'Perfect for beginners looking to start home gardening.',
      image: 'https://everlogue.aicygnus.com/android-chrome-192x192.png',
      tags: ['gardening', 'home', 'hobby'],
      website: 'https://homegardening.com',
      pricing: '$49.99',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Pro Gaming Set',
      description:
        'Everything you need to start your journey in professional gaming.',
      image: 'https://everlogue.aicygnus.com/android-chrome-192x192.png',
      tags: ['gaming', 'esports', 'accessories'],
      website: 'https://progamingset.com',
      pricing: '$199.99',
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Art & Craft Kit',
      description: 'A starter kit for art and craft enthusiasts.',
      image: 'https://everlogue.aicygnus.com/android-chrome-192x192.png',
      tags: ['art', 'craft', 'creative'],
      website: 'https://artcraftkit.com',
      pricing: '$29.99',
      rating: 4.4,
    },
    {
      id: 5,
      name: 'Fitness Pro Pack',
      description: 'The ultimate starter pack for fitness enthusiasts.',
      image: 'https://everlogue.aicygnus.com/android-chrome-192x192.png',
      tags: ['fitness', 'health', 'exercise'],
      website: 'https://fitnesspropack.com',
      pricing: '$89.99',
      rating: 4.6,
    },
  ];
}