import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadPostsComponent } from './posts/read-posts/read-posts.component';

const routes: Routes = [
  { path: 'read-posts', component: ReadPostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
