import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-dashboard-user",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard-user.component.html",
  styleUrl: "./dashboard-user.component.css",
})
export class DashboardUserComponent implements OnInit {
  fullName = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.fullName = localStorage.getItem("fullName") || "Usuario";
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}