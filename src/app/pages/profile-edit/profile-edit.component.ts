import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountSessionService, type AccountType } from '../../services/account-session.service';

type ProfileRole = 'artist' | 'club';
type ArtistType =
  | 'musician-band'
  | 'comedian'
  | 'magician'
  | 'trivia-host'
  | 'dj'
  | 'other';

@Component({
  selector: 'app-profile-edit',
  imports: [RouterLink],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  private readonly accountSession = inject(AccountSessionService);
  private readonly accountType = signal<AccountType | null>(this.accountSession.getAccountType());

  protected readonly showRoleSwitch = computed(() => this.accountType() === null);
  protected readonly role = signal<ProfileRole>(this.accountType() ?? 'artist');
  protected readonly artistType = signal<ArtistType>('musician-band');

  protected setRole(nextRole: ProfileRole): void {
    if (!this.showRoleSwitch()) {
      return;
    }
    this.role.set(nextRole);
  }

  protected setArtistType(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as ArtistType;
    this.artistType.set(value);
  }

  protected showMusicGenre(): boolean {
    return this.artistType() === 'musician-band' || this.artistType() === 'dj';
  }
}
