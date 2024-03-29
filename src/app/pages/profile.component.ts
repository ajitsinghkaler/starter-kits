import { Component, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { ProfileKitsComponent } from '../components/profile-kits.component';
import { AuthService } from '../services/auth.service';
import { distinctUntilChanged, filter, tap } from 'rxjs';
import { ProfileStore } from '../stores/profile.store';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileStore],
  template: `
    <div class="container mx-auto my-16 p-4 max-w-4xl relative">
      @if (profileStore.isLoading()) {
      <div class="grid gap-2">
        <p-skeleton width="70%"></p-skeleton>
        <p-skeleton width="70%"></p-skeleton>
        <p-skeleton width="70%"></p-skeleton>
      </div>
      } @else{ @if(!profileStore.edit()){
      <span
        (click)="profileStore.startEditing()"
        (keyup.enter)="profileStore.startEditing()"
        tabindex="0"
        class="pi pi-pencil absolute right-4 rounded p-1 cursor-pointer"
      ></span>
      <div class="flex items-center mb-20">
        <!-- <div>
          <img
            class="rounded-full w-24 h-24 object-cover mr-6"
            [src]="
              profileStore.profile()?.avatar_url ||
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
            "
            alt="Profile Picture"
          />
        </div> -->
        <div>
          <h2 class="text-2xl mb-1 font-semibold">
            {{ profileStore.profile()?.full_name }}
          </h2>
          <p class="text-sm">
            Email:
            <span class="font-medium">{{ profileStore.profile()?.email }}</span>
          </p>
          <a class="text-sm" [routerLink]="profileStore.profile()?.website"
            >Website:
            <span class=" hover:underline font-medium">{{
              profileStore.profile()?.website
            }}</span></a
          >
        </div>
      </div>
      } @else{
      <form
        class="block"
        #profileForm="ngForm"
        (ngSubmit)="
          profileStore.updateProfile(
            profileForm,
            authService.userState.getValue().user?.id
          )
        "
      >
        <div class="flex items-center">
          <label
            for="full_name"
            class="block text-sm text-gray-700 mr-2 font-semibold"
            >Full Name</label
          >
          <input
            pInputText
            id="full_name"
            name="full_name"
            [ngModel]="profileStore.profile()?.full_name"
            class="text-sm mb-2"
          />
        </div>
        <!-- <input
         name="email"
          [ngModel]="profileStore.profile()?.email"
          class="font-medium text-sm focus-visible:outline-0 w-full"
        /> -->
        <div class="flex items-center">
          <label
            for="website"
            class="block text-sm text-gray-700 mr-2 font-semibold"
            >Website</label
          >
          <input
            pInputText
            id="website"
            name="website"
            [ngModel]="profileStore.profile()?.website"
            class="text-sm mb-1"
          />
        </div>
        <div class="mt-4 flex mb-10">
          <button
            type="submit"
            class="text-sm bg-black text-white px-4 py-1 hover:bg-gray-900 transition flex items-center rounded"
          >
            Save
          </button>
          <button
            (click)="profileStore.stopEditing()"
            class="text-sm ml-2 border  text-black px-4 py-1 hover:bg-zinc-100 transition flex items-center rounded"
          >
            Cancel
          </button>
        </div>
      </form>
      }
      <div>
        <p-tabView>
          <p-tabPanel header="Saved Starter Kits">
            <app-profile-kits
              [starterKits]="profileStore.profile()?.savedKits || []"
              emptyMessage="You don't have any saved boilerplates."
            ></app-profile-kits>
          </p-tabPanel>
          @defer (on immediate; prefetch on idle) {
          <p-tabPanel header="My Starter Kits">
            <app-profile-kits
              [myKits]="true"
              [starterKits]="profileStore.profile()?.myKits || []"
              emptyMessage="You don't have any boilerplates. Create one now."
            ></app-profile-kits>
          </p-tabPanel>
          }
        </p-tabView>
      </div>
      }
    </div>
  `,
  styles: `
  .p-dataview-emptymessage	{
    @apply font-semibold text-lg;
  }
  .p-tabview-panels{
    @apply p-0
  }
  `,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ProfileKitsComponent,
    AvatarModule,
    RouterLink,
    TabViewModule,
    FormsModule,
    SkeletonModule,
    InputTextModule,
  ],
})
export class ProfileComponent implements OnDestroy {
  authService = inject(AuthService);
  profileStore = inject(ProfileStore);
  user$ = this.authService.user$.pipe(
    distinctUntilChanged(),
    tap(() => {
      this.profileStore.startLoading();
    }),
    filter((user) => Boolean(user.user)),
    tap((user) => this.profileStore.loadProfile(user.user!.id))
  );

  userSubscription = this.user$.subscribe();

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
