import {Component, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthService} from "./shared/services/auth.service";
import {User} from "@angular/fire/auth";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'chef-vlog';
  page = '';
  routes: Array<string> = [];
  loggedInUser: User | null | undefined;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((evts: any) => {
        const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
        if (this.routes.includes(currentPage)) {
          this.page = currentPage;
        }
    });

    this.authService.isUserLoggedIn().subscribe((user: User | null) => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      this.toastr.error('Error while trying to log you in', 'Error');
      localStorage.setItem('user', JSON.stringify('null'));
    });

  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      this.toastr.success('Logged out', 'Success');
    }).catch(error => {
      this.toastr.error('Error while trying to log you out', 'Error');
    });
  }
}
