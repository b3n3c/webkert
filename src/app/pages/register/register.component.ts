import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService,
              private toastr: ToastrService, private router: Router) { }

  onSubmit() {
    this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).
    then(cred => {
      this.toastr.success('Successfully registered', 'Success');
      this.router.navigateByUrl('/main');
    }).catch(error => {
      this.toastr.error('Error while trying to sign you up', 'Error');
    });
  }

  goBack() {
    this.location.back();
  }
}
