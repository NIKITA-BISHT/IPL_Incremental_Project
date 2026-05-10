import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavBarComponent implements OnInit {
  role: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("role");

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.role = localStorage.getItem("role");
      });
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    this.router.navigate(["/auth"]);
  }
}