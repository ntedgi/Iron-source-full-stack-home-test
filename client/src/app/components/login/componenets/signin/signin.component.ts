import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/loginService'
import { User } from '../../../../interfaces'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {

  @ViewChild("email", { static: true }) emailField: ElementRef;

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router) {
    this.initForm();
  }

  private initForm() {
    const email = ""
    this.signupForm = this.fb.group({
      email: [email, Validators.required],
    });
  }

  public onSubmit() {
    const email = this.signupForm.value.email
    console.log(email)
    this.auth.signup(<User>{ email: email })
    this.signupForm.reset();
  }

  ngOnInit(): void {
  }

}
