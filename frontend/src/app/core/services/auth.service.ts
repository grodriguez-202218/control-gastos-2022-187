import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

const API_URL = "http://localhost:3000/api/auth";

export interface LoginResponse {
  token: string;
  user: { id: number; full_name: string; email: string; role: "user" | "admin" };
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${API_URL}/register`, data);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("fullName", res.user.full_name);
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  getRole(): string | null {
    return localStorage.getItem("role");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}