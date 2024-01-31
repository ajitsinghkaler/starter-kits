import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { ReviewsComponent } from "../components/reviews.component";
import { SimilarKitsComponent } from "../components/similar-kits.component";
import { LoginComponent } from "../components/login.component";

@Component({
    selector: 'app-details',
    standalone: true,
    template: `
    <div class="container mx-auto py-20">
      <div class="flex">
        <div class="w-1/2">
          <div class="flex items-center">
            <p-avatar label="P" styleClass="mr-2" size="xlarge"></p-avatar>
            <div class="ml-4 flex justify-between">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl mr-5">
                AI Company Name
              </h2>
            </div>
          </div>
          @for (tag of tags; track $index) {
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            ># {{ tag }}</span
          >
          }
          <div class="flex justify-between">
            <span>
              <p-rating [readonly]="true" [cancel]="false"></p-rating> from
              {{ reviewCount }} reviews
            </span>
            <a href="#">https://everlogue.aicygnus.com</a>
          </div>
          <p
            class="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
          >
            A brief description of the AI company and its services.
          </p>
          <div class="flex items-center mt-4">
            <button
              class="bg-black text-white px-4 py-2 hover:bg-gray-900 transition flex items-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5 mr-2"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
              Write a Review
            </button>
            <button
              class="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition ml-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
                stroke="#349eeb"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 mr-2"
              >
                <path
                  d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
                ></path>
              </svg>
              324
            </button>
          </div>
        </div>
        <div class="w-1/2 h-96 overflow-hidden">
          <img
            src="https://everlogue.aicygnus.com/compressed-images/promax-home.webp"
          />
        </div>
      </div>
      <div class="mx-auto w-full max-w-7xl px-4">
          <p class="my-2">
            Synthesys Studio is the ultimate solution for businesses of all
            sizes that want to take their digital messaging to the next level.
            Say goodbye to bland, expensive content and hello to dynamic and
            engaging with our cutting-edge technology. And all that without
            having to pay the big bucks.<br /><br />The Text-to-Speech and
            Text-to-Video tools provide vibrant and dynamic voices and videos
            that connect with your customers on an emotional level. With clear
            and natural voiceovers and talking head videos, you can establish
            trust and authority with your audience and build a lasting
            relationship with your brand.<br /><br />Gone are the days of
            robotic and strange-sounding voices that drive customers away. Our
            ridiculously easy-to-use AI Voice Generator offers access to more
            than 374 different voices in more than 140 languages, built to offer
            a unique and trustworthy voiceover experience by letting you
            customize the narrative, the speed, and the overall feel of your
            voiceover.<br /><br />Looking to create your own videos? Our AI
            Video Generator offers more than 60 human-trained AI Avatars and 50+
            premium templates that let you create a unique virtual spokesperson
            to deliver visuals that elevate your messaging. You'll be amazed at
            how easy it is to create professional-quality videos that capture
            your audience's attention and leave a lasting impression without
            paying actors or getting expensive equipment.<br /><br />Whether
            you're looking to grow your business or simply enhance your digital
            presence, Synthesys is the answer. Trust us to transform your plain
            old content into a great digital asset that speaks to your audience
            and sets your brand apart from the competition.
          </p>
      </div>
    </div>
    <app-reviews></app-reviews>
    <app-similar-kits></app-similar-kits>
    <app-login></app-login>
  `,
    styles: ``,
    imports: [AvatarModule, RatingModule, ReviewsComponent, SimilarKitsComponent, LoginComponent]
})
export class DetailsComponent {
  tags = ['AI', 'Machine Learning', 'Data Science', 'Computer Vision'];
  reviewCount = 10;
}
