import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { StarterKitCardsComponent } from './starter-kit-cards.component';

@Component({
  selector: 'app-starter-kits',
  standalone: true,
  template: `
    <div class="container mx-auto">
      <p-tabView>
        @for (tab of tabs; track $index) {
        <p-tabPanel [header]="tab.title">
          <div class="grid grid-cols-4 gap-6">
            @for (starterKit of starterKits; track $index) {
            <app-starter-kit-cards
              [starterKitData]="starterKit"
            ></app-starter-kit-cards>
            }
          </div>
        </p-tabPanel>
        }
      </p-tabView>
    </div>
  `,
  styles: ``,
  imports: [TabViewModule, StarterKitCardsComponent],
})
export class StarterKitsComponent {
  tabs = [
    { title: 'Featured', content: 'Tab 1 Content' },
    { title: 'New', content: 'Tab 3 Content' },
  ];

  starterKits = [
    {
      id: 1,
      name: 'Ultimate Developer Kit',
      description: 'A comprehensive kit for software development enthusiasts.',
      image: 'https://everlogue.aicygnus.com/android-chrome-192x192.png',
      tags: ['development', 'software', 'programming'],
      website: 'https://developerkit.com',
      pricing: '$99.99',
      rating: 4.5,
      reviews: [
        {
          id: 1,
          userName: 'User1',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'Great kit for beginners!',
        },
        {
          id: 2,
          userName: 'User2',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'I love the variety of tools included.',
        },
      ],
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
      reviews: [
        {
          id: 1,
          userName: 'User1',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'Great kit for beginners!',
        },
        {
          id: 2,
          userName: 'User2',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'I love the variety of tools included.',
        },
      ],
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
      reviews: [
        {
          id: 1,
          userName: 'User1',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'Great kit for beginners!',
        },
        {
          id: 2,
          userName: 'User2',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'I love the variety of tools included.',
        },
      ],
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
      reviews: [
        {
          id: 1,
          userName: 'User1',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'Great kit for beginners!',
        },
        {
          id: 2,
          userName: 'User2',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'I love the variety of tools included.',
        },
      ],
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
      reviews: [
        {
          id: 1,
          userName: 'User1',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'Great kit for beginners!',
        },
        {
          id: 2,
          userName: 'User2',
          rating: 5, // Assuming a 5-star rating for demonstration
          review: 'I love the variety of tools included.',
        },
      ],
    },
  ];
}
