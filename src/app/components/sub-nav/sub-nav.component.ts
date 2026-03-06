import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountSessionService } from '../../services/account-session.service';

@Component({
  selector: 'app-sub-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sub-nav.component.html',
  styleUrl: './sub-nav.component.scss'
})
export class SubNavComponent {
  private readonly router = inject(Router);
  private readonly accountSession = inject(AccountSessionService);

  protected logOut(): void {
    this.accountSession.clearSession();
    void this.router.navigateByUrl('/signed-out');
  }
}
