import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../../services/loginService';
import {User} from '../../../../interfaces';
import {PrimeNGConfig, MessageService} from 'primeng/api';
import {CHAT_ROOMS_URL} from '../../../../consts';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService, FormBuilder, LoginService, HttpClient]
})
export class SignupComponent implements OnInit {

  @ViewChild('email', {static: true}) emailField: ElementRef;
  @ViewChild('nickName', {static: true}) nickNameField: ElementRef;

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router,
              private messageService: MessageService, private primengConfig: PrimeNGConfig
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
      nickName: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  navigateToChatRooms(): void {
    this.router.navigateByUrl(CHAT_ROOMS_URL);
  }

  onSuccessSignUp(nickName): void {
    this.messageService.add({key: 'tl', severity: 'info', summary: 'Info', detail: 'User Created ! Let\'s Go to the chat rooms.'});
    localStorage.setItem('nick_name', nickName);
    setTimeout(
      this.navigateToChatRooms.bind(this)
      , 1800);
  }

  onSubmit(): void {
    const nickName = this.signupForm.value.nickName;
    const email = this.signupForm.value.email;
    this.auth.signup({email, name: nickName} as User).then(response => {
        if (response.status === 200) {
          this.onSuccessSignUp(nickName);
        } else {
          this.messageService.add({key: 'tl', severity: 'error', summary: 'Error', detail: response.errorMessage});
        }
      }
    );

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
