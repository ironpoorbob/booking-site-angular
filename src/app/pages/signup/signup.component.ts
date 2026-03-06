import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccountSessionService, type AccountType } from '../../services/account-session.service';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  protected readonly selectedAccountType = signal<AccountType | null>(null);

  constructor(
    private readonly router: Router,
    private readonly accountSession: AccountSessionService
  ) {}

  protected setAccountType(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value === 'artist' || value === 'club') {
      this.selectedAccountType.set(value);
    }
  }

  protected createAccount(event: Event): void {
    event.preventDefault();
    const accountType = this.selectedAccountType();
    if (!accountType) {
      return;
    }

    this.accountSession.setAccountType(accountType);
    void this.router.navigateByUrl('/dashboard');
  }
}

