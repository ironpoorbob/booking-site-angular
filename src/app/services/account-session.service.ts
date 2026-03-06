import { Injectable, signal } from '@angular/core';

export type AccountType = 'artist' | 'club';

const ACCOUNT_TYPE_STORAGE_KEY = 'bookingSite.accountType';

@Injectable({ providedIn: 'root' })
export class AccountSessionService {
  protected readonly accountType = signal<AccountType | null>(this.loadStoredAccountType());

  setAccountType(nextAccountType: AccountType): void {
    this.accountType.set(nextAccountType);
    localStorage.setItem(ACCOUNT_TYPE_STORAGE_KEY, nextAccountType);
  }

  clearSession(): void {
    this.accountType.set(null);
    localStorage.removeItem(ACCOUNT_TYPE_STORAGE_KEY);
  }

  getAccountType(): AccountType | null {
    return this.accountType();
  }

  private loadStoredAccountType(): AccountType | null {
    const value = localStorage.getItem(ACCOUNT_TYPE_STORAGE_KEY);
    return value === 'artist' || value === 'club' ? value : null;
  }
}
