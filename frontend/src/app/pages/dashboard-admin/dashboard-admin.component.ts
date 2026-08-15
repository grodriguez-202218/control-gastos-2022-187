import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-dashboard-admin",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard-admin.component.html",
  styleUrl: "./dashboard-admin.component.css",
})
export class DashboardAdminComponent implements OnInit {
  fullName = "";
  totalUsers = 0;
  totalAdmins = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.fullName = localStorage.getItem("fullName") || "Administrador";
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}