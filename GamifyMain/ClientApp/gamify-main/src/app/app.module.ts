import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { PlaceCreateComponent } from './place-create/place-create.component';
import { PlaceEditComponent } from './place-edit/place-edit.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { SearchComponent } from './search/search.component';
import { PlaceAboutComponent } from './place-about/place-about.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameFormComponent } from './game-form/game-form.component';
import { WishedGameCreateComponent } from './wished-game-create/wished-game-create.component';
import { WishedGameEditComponent } from './wished-game-edit/wished-game-edit.component';
import { CommentComponent } from './comment/comment.component';
import { CommentAddComponent } from './comment-add/comment-add.component';

const appRoutes: Routes = [
  { path: 'cabinet', component: CabinetComponent },
  { path: 'create/:id', component: PlaceCreateComponent },
  { path: 'edit/:id', component: PlaceEditComponent },
  { path: 'createWishedGame/:id', component: WishedGameCreateComponent },
  { path: 'editWishedGame/:id', component: WishedGameCreateComponent },
  { path: 'createGame/:id', component: GameCreateComponent },
  { path: 'editGame/:placeId/:gameId', component: GameEditComponent },
  { path: 'search', component: SearchComponent },
  { path: 'placeAbout/:id', component: PlaceAboutComponent },
  { path: 'addComment/:id', component: CommentAddComponent },
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
    SearchComponent,
    PlaceAboutComponent,
    GameCreateComponent,
    GameEditComponent,
    GameFormComponent,
    WishedGameCreateComponent,
    WishedGameEditComponent,
    CommentComponent,
    CommentAddComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),

    MatSnackBarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,

    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbITZYywD4njD0jcP0bou0aEj_EKMCGiU',
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
