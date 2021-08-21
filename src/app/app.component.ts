import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Subject } from 'rxjs';
import { CommonService } from './services/common.service';
import { filter, takeUntil } from 'rxjs/operators';
import { EventMessage, EventType, InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult, AuthError } from '@azure/msal-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private common: CommonService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  

  share() {
    if (navigator.share) {
      navigator.share({
        title: 'Astroapps',
        text: 'Allows to perform actions easily!',
        url: window.location.href,
      })
        .then(() => this.common.informUser('successfuly shared!'))
        .catch((error) => this.common.informUser('failed to share!'));
    }
  }

  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      let accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }


  isLogedIn(): boolean {
    if (this.msalService.instance.getAllAccounts().length > 0) {
      return true;
    }
    return false;
  }

  public login(): void {
    if (!this.isLogedIn()) {
      this.msalService.loginRedirect({scopes: []})
    } 
  }

  logout() {
    if (this.isLogedIn()) {
      this.msalService.logout();
    }  
  }

  ngOnInit(): void {    
    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.checkAndSetActiveAccount();
    });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        this.checkAndSetActiveAccount()
        this.common.informUser('login successful')
        return result;
      });

      this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        // Add your auth error handling logic here
        this.common.informUser('Failed to login')
      });
  }

  motor_on_share() {
    if (navigator.share) {
      navigator.share({
        title: '',
        text: '',
        url: 'r1on'
      })
      this.common.informUser('Successful')
    }
    else {
      this.common.informUser('Not supported')
    }
  }

  motor_off_share() {
    if (navigator.share) {
      navigator.share({
        title: '',
        text: '',
        url: 'r1off'
      })
      this.common.informUser('Successful')
    }
    else {
      this.common.informUser('Not supported')
    }
  }

}
