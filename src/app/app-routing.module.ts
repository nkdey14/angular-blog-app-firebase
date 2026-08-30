import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { ViewPostsComponent } from './features/post/pages/view-posts/view-posts.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePostComponent,
  },
  {
    path: 'newPost',
    component: CreatePostComponent,
  },
  {
    path: 'posts',
    component: ViewPostsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
