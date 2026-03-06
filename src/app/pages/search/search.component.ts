import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountSessionService, type AccountType } from '../../services/account-session.service';

type SearchRole = 'artist' | 'club';

interface ArtistResult {
  name: string;
  genre: string;
  city: string;
  summary: string;
}

interface ClubResult {
  name: string;
  city: string;
  capacity: number;
  summary: string;
}

interface SearchData {
  artists: ArtistResult[];
  clubs: ClubResult[];
}

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private readonly http = inject(HttpClient);
  private readonly accountSession = inject(AccountSessionService);

  private readonly accountType = signal<AccountType | null>(this.accountSession.getAccountType());
  private readonly lockedSearchRole = computed<SearchRole | null>(() => {
    if (this.accountType() === 'artist') {
      return 'club';
    }
    if (this.accountType() === 'club') {
      return 'artist';
    }
    return null;
  });

  protected readonly role = signal<SearchRole>('artist');
  protected readonly artists = signal<ArtistResult[]>([]);
  protected readonly clubs = signal<ClubResult[]>([]);
  protected readonly dataLoadFailed = signal(false);

  protected readonly activeRole = computed<SearchRole>(() => this.lockedSearchRole() ?? this.role());
  protected readonly showRoleSwitch = computed(() => this.lockedSearchRole() === null);

  protected readonly resultCount = computed(() =>
    this.activeRole() === 'artist' ? this.artists().length : this.clubs().length
  );

  constructor() {
    this.loadMockData();
  }

  protected setRole(nextRole: SearchRole): void {
    if (this.lockedSearchRole()) {
      return;
    }
    this.role.set(nextRole);
  }

  private loadMockData(): void {
    this.http.get<SearchData>('mock/search-data.json').subscribe({
      next: (data) => {
        this.artists.set(data.artists ?? []);
        this.clubs.set(data.clubs ?? []);
        this.dataLoadFailed.set(false);
      },
      error: () => {
        this.artists.set([]);
        this.clubs.set([]);
        this.dataLoadFailed.set(true);
      }
    });
  }
}
