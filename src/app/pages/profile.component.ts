import { Component, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { ProfileKitsComponent } from '../components/profile-kits.component';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, tap } from 'rxjs';
import { ProfileStore } from '../stores/profile.store';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileStore],
  template: `
    <div class="container mx-auto my-16 p-4 max-w-4xl">
      @if (profileStore.isLoading()) {
      <p>Loading...</p>

      } @else{
      <div class="flex items-center mb-20 w-full">
        <div>
          <img
            class="rounded-full w-24 h-24 object-cover md:mr-6 mr-3"
            [src]="
              profileStore.profile()?.avatar_url ||
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
            "
            alt="Profile Picture"
          />
        </div>
        <div class="flex-grow">
          <div>
            @if(profileStore.name()){
            <input
              [value]="profileStore.profile()?.full_name"
              class="text-2xl mb-1 font-semibold focus-visible:outline-0"
            />
            } @else{
            <h2 class="text-2xl mb-1 font-semibold">
              {{ profileStore.profile()?.full_name }}
              <i
                (click)="profileStore.editName()"
                (keyup.enter)="profileStore.editName()"
                tabindex="0"
                class="pi pi-pencil ml-3 cursor-pointer"
              ></i>
            </h2>
            }
          </div>
          @if(profileStore.email()){
          <p class="text-sm flex mb-1">
            <input
              [value]="profileStore.profile()?.email"
              class="font-medium focus-visible:outline-0 w-full"
            />
          </p>
          } @else{
          <p class="text-sm mb-1">
            Email:
            <span class="font-medium">{{ profileStore.profile()?.email }}</span>
            <i
              (click)="profileStore.editEmail()"
              (keyup.enter)="profileStore.editEmail()"
              tabindex="0"
              class="pi pi-pencil ml-3 cursor-pointer"
            ></i>
          </p>

          } @if(profileStore.website()){
          <div>
            <input
              [value]="profileStore.profile()?.website"
              class="hover:underline focus-visible:outline-0 font-medium w-full text-sm"
            />
          </div>
          } @else{
          <div class="flex items-center">
            <a class="text-sm" [routerLink]="profileStore.profile()?.website"
              >Website:
              <span class="hover:underline font-medium ">{{
                profileStore.profile()?.website
              }}</span>
            </a>
            <i
              (click)="profileStore.editWebsite()"
              (keyup.enter)="profileStore.editWebsite()"
              tabindex="0"
              class="pi pi-pencil ml-3 cursor-pointer"
            ></i>
          </div>
          }
        </div>
      </div>
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
  imports: [ProfileKitsComponent, AvatarModule, RouterLink, TabViewModule],
})
export class ProfileComponent implements OnDestroy {
  authService = inject(AuthService);
  profileStore = inject(ProfileStore);
  user$ = toObservable(this.authService.userState).pipe(
    distinctUntilChanged(),
    tap(() => {
      this.profileStore.startLoading();
      console.log('Loading profile');
    }),
    filter((userState) => Boolean(userState)),
    tap((userState) => this.profileStore.loadProfile(userState.user!.id))
  );

  userSubscription = this.user$.subscribe();

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
