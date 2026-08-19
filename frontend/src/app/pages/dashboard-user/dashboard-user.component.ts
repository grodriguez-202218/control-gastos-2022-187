import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-dashboard-user",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard-user.component.html",
  styleUrl: "../../core/styles/dashboard.css",
})
export class DashboardUserComponent implements OnInit {
  fullName = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit = (): void => {
    this.fullName = localStorage.getItem("fullName") || "Usuario";

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