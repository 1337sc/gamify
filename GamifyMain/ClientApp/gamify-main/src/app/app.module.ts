import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appRoutes: Routes = [
  { path: 'cabinet/:email', component: CabinetComponent },
  { path: 'create/:id', component: PlaceCreateComponent },
  { path: 'edit/:id', component: PlaceEditComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthButtonComponent,
    HomeComponent,
    CabinetComponent,
    PlaceCreateComponent,
    PlaceEditComponent,
    PlaceFormComponent,
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbITZYywD4njD0jcP0bou0aEj_EKMCGiU',
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
