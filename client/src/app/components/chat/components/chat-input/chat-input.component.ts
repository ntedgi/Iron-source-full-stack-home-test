import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {User} from '../../../../interfaces';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder]
})
export class ChatInputComponent {
  @ViewChild('text', {static: true}) nameField: ElementRef;
  @Input() user: User;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onMessage = new EventEmitter<string>();

  public textMessageInput: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.textMessageInput = this.fb.group({
      text: new FormControl('', [Validators.required])
    });
  }


  public onSubmit(): void {
    this.onMessage.emit(this.textMessageInput.value.text);
    this.textMessageInput.reset();
  }
}
