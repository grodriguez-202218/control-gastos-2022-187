import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { DashboardAdminComponent } from "./pages/dashboard-admin/dashboard-admin.component";
import { DashboardUserComponent } from "./pages/dashboard-user/dashboard-user.component";
import { authGuard } from "./core/guards/auth-guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "admin",
    component: DashboardAdminComponent,
    canActivate: [authGuard],
    data: { role: "admin" },
  },
  {
    path: "dashboard",
    component: DashboardUserComponent,
    canActivate: [authGuard],
    data: { role: "user" },
  },
];