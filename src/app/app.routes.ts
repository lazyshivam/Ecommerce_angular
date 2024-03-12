
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { userPermissionGuard } from './user-permission.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { LayoutComponent } from './layout/layout.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canMatch:[userPermissionGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canMatch: [userPermissionGuard], component: ProductDashboardComponent },
      {path:'user-cart',canMatch:[userPermissionGuard],component:UserCartComponent},
    ]
  },
  { path: '', component: SignupComponent }, // Default route for signup
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path:'**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
