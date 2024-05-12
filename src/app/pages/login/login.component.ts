import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  async login() {
    this.loading = true;

    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      this.toastr.error('Failed to login', 'Email or password is wrong');
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
