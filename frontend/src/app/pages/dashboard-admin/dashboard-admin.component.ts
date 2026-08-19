import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-dashboard-admin",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard-admin.component.html",
  styleUrl: "../../core/styles/dashboard.css",
})
export class DashboardAdminComponent implements OnInit {
  fullName = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit = (): void => {
    this.fullName = localStorage.getItem("fullName") || "Administrador";

    const token = localStorage.getItem("token");
    if (token && !this.authService.isTokenExpired()) {
      this.authService.scheduleAutoLogout(token);
    }
  };

  logout = (): void => {
    this.authService.logout();
    this.router.navigate(["/login"]);
  };
}