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

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MessageService, FormBuilder, LoginService]
})
export class SigninComponent implements OnInit {

  @ViewChild('email', {static: true}) emailField: ElementRef;

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: LoginService, private router: Router,
              private messageService: MessageService, private primengConfig: PrimeNGConfig
  ) {
    this.initForm();
  }

  navigateToChatRooms(): void {
    this.router.navigateByUrl(CHAT_ROOMS_URL);
  }

  onSuccessSignIn(nickName): void {
    this.messageService.add({key: 'tl', severity: 'info', summary: 'Info', detail: `Hi ${nickName} ! Let\'s Go to the chat rooms.`});
    localStorage.setItem('nick_name', nickName);
    setTimeout(
      this.navigateToChatRooms.bind(this)
      , 1800);
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])
    });
  }

  public onSubmit(): void {
    const email = this.signupForm.value.email;
    console.log(email);
    this.auth.signIn({email} as User).then(response => {
      if (response.status === 200) {
        this.onSuccessSignIn(response.data.nickName);
      } else {
        this.messageService.add({key: 'tl', severity: 'error', summary: 'Error', detail: response.errorMessage});
      }
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
