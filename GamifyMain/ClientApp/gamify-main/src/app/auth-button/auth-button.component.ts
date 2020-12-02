/// <reference path="..\..\..\node_modules\@types\gapi\index.d.ts" />
/// <reference path="..\..\..\node_modules\@types\gapi.auth2\index.d.ts" />
/// <reference path="..\..\..\node_modules\@types\googlemaps\index.d.ts" />
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../user';

declare var gapi: any;

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}

  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public gapiUser: gapi.auth2.GoogleUser;
  public error: string;

  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.gapiUser = this.authInstance.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve function is the callback
    // passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi loaded
    // and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({
          client_id:
            '833981709387-l3v17h8jtftr4cqdmvbol453949k4n6u.apps.googleusercontent.com',
        })
        .then((auth: gapi.auth2.GoogleAuth) => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance
        .signIn()
        .then((user) => {
          this.gapiUser = user;
        })
        .then(() => {
          var gapiUserEmail = this.gapiUser.getBasicProfile().getEmail();
          var gapiUserName = this.gapiUser.getBasicProfile().getName();

          this.dataService.getUserByEmail(gapiUserEmail).subscribe(
            (response) => {
              console.log('Got from db ' + response.body.id.toString());
              localStorage.setItem('curUser', response.body.id.toString());
              console.log(localStorage.getItem('curUser'));
            },
            (err) => {
              console.log(err.status);
              if (err.status == 404) {
                this.dataService
                  .createUser({
                    email: gapiUserEmail,
                    name: gapiUserName,
                  })
                  .subscribe((response) => {
                    console.log('Created new ' + response.body.id.toString());
                    localStorage.setItem(
                      'curUser',
                      response.body.id.toString()
                    );
                  });
              }
            }
          );
        });
    });
  }

  async logout() {
    this.authInstance.signOut();
    this.gapiUser = null;
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }
}
