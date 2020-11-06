import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/loginService'
import { User } from '../../../../interfaces'
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]

})
export class SignupComponent implements OnInit {


  @ViewChild("email", { static: true }) emailField: ElementRef;
  @ViewChild("nickName", { static: true }) nickNameField: ElementRef;

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router,
    private messageService: MessageService, private primengConfig: PrimeNGConfig
  ) {
    this.initForm();
  }

  private initForm() {
    const email = ""
    const nickName = ""
    this.signupForm = this.fb.group({
      email: [email, Validators.required],
      nickName: [nickName, [Validators.required]]
    });
  }

  public onSubmit() {
    const nickName = this.signupForm.value.nickName
    const email = this.signupForm.value.email
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
    // this.auth.signup(<User>{ email: email, name: nickName })

    this.signupForm.reset();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
