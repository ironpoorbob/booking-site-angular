import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountSessionService } from '../../services/account-session.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private readonly accountSession: AccountSessionService) {}

  protected get accountTypeLabel(): string {
    return this.accountSession.getAccountType() === 'club' ? 'Club/Booker' : 'Artist';
  }
}
