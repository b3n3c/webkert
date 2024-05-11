import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./shared/services/auth.guard"

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    // canActivate: [authGuard]
  },
  {
    path: 'add-post',
    loadChildren: () => import('./pages/add-post/add-post.module').then(m => m.AddPostModule)
  },
  {
    path: 'edit-post/:id',
    loadChildren: () => import('./pages/edit-post/edit-post.module').then(m => m.EditPostModule)
  },
  {
    path: 'my-posts',
    loadChildren: () => import('./pages/my-posts/my-posts.module').then(m => m.MyPostsModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
