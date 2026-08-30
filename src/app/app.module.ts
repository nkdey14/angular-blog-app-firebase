import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { provideAuth, getAuth } from '@angular/fire/auth';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';

import { environment } from '../environments/environment';
import { LoggedInFunctionalityComponent } from './features/login/pages/logged-in-functionality/logged-in-functionality.component';
import { LoggedOutFunctionalityComponent } from './features/login/pages/logged-out-functionality/logged-out-functionality.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { DashboardStatisticsComponent } from './features/dashboard/pages/dashboard/components/dashboard-statistics/dashboard-statistics.component';
import { ViewPostsComponent } from './features/post/pages/view-posts/view-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreatePostComponent,
    LoggedInFunctionalityComponent,
    LoggedOutFunctionalityComponent,
    DashboardComponent,
    DashboardStatisticsComponent,
    ViewPostsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => getAuth()),

    provideFirestore(() => getFirestore()),

    provideStorage(() => getStorage()),
  ],

  providers: [provideHttpClient()],

  bootstrap: [AppComponent],
})
export class AppModule {}
