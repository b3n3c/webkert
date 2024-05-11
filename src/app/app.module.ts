import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { AddPostComponent } from './pages/add-post/add-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';
import {MenuComponent} from "./shared/menu/menu.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainComponent,
    AddPostComponent,
    EditPostComponent,
    DateFormatPipe,
    MyPostsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "webkert-e4c9d",
      "appId": "1:909562521327:web:8ebaa387a96c19bb80dd1a",
      "storageBucket": "webkert-e4c9d.appspot.com",
      "apiKey": "AIzaSyAQmoA0uR3ymZ2Qr5qrto_MYxbxPtZ1zpE",
      "authDomain": "webkert-e4c9d.firebaseapp.com",
      "messagingSenderId": "909562521327",
      "measurementId": "G-HBB7LT4EGP"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatSidenavModule,
    MatSidenavContainer,
    MatToolbar,
    MatIcon,
    MatListItem,
    MatNavList,
    MatIconButton,
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
