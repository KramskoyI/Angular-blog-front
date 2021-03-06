import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PostsComponent } from './posts/posts.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post/add-post.component';
import { AuthIntecepter } from './auth.interceptor';
import { ReadPostComponent } from './read-post/read-post.component';
import { SortTagComponent } from './sort-tag/sort-tag.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthIntecepter
}
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PostsComponent,
    SignUpComponent,
    SignInComponent,
    AddPostComponent,
    ReadPostComponent,
    SortTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
