import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { ShowPostComponent } from './posts/show-post/show-post.component';

const routes: Routes = [
  { path: 'posts/:id', component: ShowPostComponent },
  { path: 'posts', component: ListPostsComponent },
  { path: '', redirectTo: 'posts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
