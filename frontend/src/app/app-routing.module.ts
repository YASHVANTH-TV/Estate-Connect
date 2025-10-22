import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AdminViewPropertyComponent } from './components/admin-view-property/admin-view-property.component';
import { AdminAddPropertyComponent } from './components/admin-add-property/admin-add-property.component';
import { AdminEditPropertyComponent } from './components/admin-edit-property/admin-edit-property.component';
import { UserViewPropertiesComponent } from './components/user-view-properties/user-view-properties.component';
import { AuthGuard } from './guards/auth.guard';
import { UserViewInquiryComponent } from './components/user-view-inquiry/user-view-inquiry.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserAddInquiryComponent } from './components/user-add-inquiry/user-add-inquiry.component';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';
import { AdminViewInquiryComponent } from './components/admin-view-inquiry/admin-view-inquiry.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Admin Routes
  {
    path: 'admin-view-properties',
    component: AdminViewPropertyComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin-add-property',
    component: AdminAddPropertyComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin-edit-property/:propertyId',
    component: AdminEditPropertyComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin-view-inquiries',
    component: AdminViewInquiryComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin-view-feedbacks',
    component: AdminViewFeedbackComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin-control-panel',
    component: AdminControlPanelComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },

  // User Routes
  {
    path: 'user-view-properties',
    component: UserViewPropertiesComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'user-view-inquiries',
    component: UserViewInquiryComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'user-view-feedback',
    component: UserViewFeedbackComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'user-add-feedback',
    component: UserAddFeedbackComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'user-add-inquiry/:propertyId',
    component: UserAddInquiryComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },

  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
