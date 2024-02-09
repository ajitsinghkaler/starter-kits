import { Component, OnDestroy, inject } from '@angular/core';
import { ProfileKitsComponent } from '../components/profile-kits.component';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { ProfileStore } from '../stores/profile.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileStore],
  template: `
    <div class="container mx-auto py-24 px-4">
      @if (profileStore.isLoading()) {
      <p>Loading...</p>

      } @else{
      <div class="flex items-center">
        <div>
          <img [src]="profileStore.profile()?.avatar_url" alt="User image" />
        </div>
        <div>
          <h2>{{profileStore.profile()?.full_name}}</h2>
            <h3>{{profileStore.profile()?.email}}</h3>
        </div>
      </div>
      <div>
        <h1>Starter Kits</h1>
        <app-profile-kits
          [starterKits]="profileStore.profile()?.starter_kits || []"
        ></app-profile-kits>
      </div>
      }
    </div>
  `,
  styles: ``,
  imports: [ProfileKitsComponent],
})
export class ProfileComponent implements OnDestroy {
  authService = inject(AuthService);
  profileStore = inject(ProfileStore);
  user$ = toObservable(this.authService.userState.user).pipe(
    tap(() => {
      this.profileStore.startLoading();
    }),
    filter((user) => Boolean(user)),
    tap((user) => this.profileStore.loadProfile(user!.id))
  );

  userSubscription = this.user$.subscribe();

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
