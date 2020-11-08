import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {User} from '../../../../interfaces';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  @ViewChild('text', {static: true}) nameField: ElementRef;
  @Input() user: User;
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
