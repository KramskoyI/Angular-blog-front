import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PostsComponent } from './posts/posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ReadPostComponent } from './read-post/read-post.component';
import { SortTagComponent } from './sort-tag/sort-tag.component';

const routes: Routes = [
  { path: '', component: PostsComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'addPost', component: AddPostComponent},
  { path: ':id', component: ReadPostComponent},
  { path: 'tag/:tag', component: SortTagComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
