import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { ViewPostsComponent } from './features/post/pages/view-posts/view-posts.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';

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
  {
    path: 'posts/edit/:id',
    component: EditPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
