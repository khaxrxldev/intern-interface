import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninRequest } from 'src/app/model/Request/SigninRequest';
import { InternUserService } from 'src/app/service/intern-user.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  @Input() userType: string = '';
  @Input() userEmail!: string;
  @Input() userPassword!: string;

  alertStatus: boolean = false;
  alertText: string = '';
  signinFormGroup!: FormGroup;

  constructor(private internUserService: InternUserService, public router: Router) {}

  ngOnInit(): void {
    this.signinFormGroup = new FormGroup({
      userEmail: new FormControl(this.userEmail, [ Validators.required ]),
      userPassword: new FormControl(this.userPassword, [ Validators.required ]),
    })
  }

  onSignin() {
    if (this.signinFormGroup.invalid) {
      return;
    }

    let signin: SigninRequest = {
      userEmail: this.signinFormGroup.value.userEmail!,
      userPassword: this.signinFormGroup.value.userPassword!,
      userType: this.userType
    }

    this.internUserService.signin(signin).subscribe({
      next: (res) => {
        if (res.message_status) {
          switch (this.userType) {
            case 'COD':
              this.router.navigate(['/dashboard/student/list']);
              break;
            case 'ACD':
              this.router.navigate(['/dashboard/student/evaluate']);
              break;
            case 'IND':
              this.router.navigate(['/dashboard/student/evaluate']);
              break;
            case 'STD':
              this.router.navigate(['/dashboard/application/list']);
              break;
          }

          sessionStorage.setItem('userId', res.data.userId);
          sessionStorage.setItem('userType', this.userType);
        } else {
          this.alertStatus = true;
          this.alertText = res.error_desc!;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
