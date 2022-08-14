import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UrlConstants } from '../enums';
import { HttpGeneralService } from './http-general.service';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn;
  private _isLoggedIn$: ReplaySubject<boolean> = new ReplaySubject();
  isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(public httpGeneralService: HttpGeneralService) {
    const token = window.localStorage.getItem('id_token');
    this.loggedIn = !!token;
    this._isLoggedIn$.next(this.loggedIn);
  }

  getToken(): string | null {
    return window.localStorage.getItem('id_token');
  }

  login(token: any): void {
    this.httpGeneralService
      .post(UrlConstants.authentication, token)
      .subscribe((response: any) => {
        window.localStorage.setItem('id_token', response.jwtToken);
        this.loggedIn = true;
        this._isLoggedIn$.next(this.loggedIn);
      });
  }

  logout(): void {
    this.loggedIn = false;
    this._isLoggedIn$.next(false);

    window.localStorage.removeItem('id_token');
  }

  isLoggedIn(): boolean {
    return !!this.loggedIn;
  }

  initGoogleOneTap() {
    window.onload = () => {
      window.google.accounts.id.initialize({
        client_id: environment.client_id,
        callback: (token: any) => {
          this.login(token);
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleLogin'),
        { theme: 'outline', size: 'large' } // customization attributes
      );
      this.isLoggedIn$.subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.authPopup(); // display the One Tap dialog
        }
      });
    };
  }

  authPopup() {
    if (document.readyState === 'complete') {
      window.google.accounts.id.prompt(); // display the One Tap dialog
    }
  }
}
