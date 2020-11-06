import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User, IConfig } from "../../../../interfaces";

@Component({
  selector: "chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  @ViewChild("text", { static: true }) nameField: ElementRef;
  @Input() set selectedUser(selectedUser: User) {
    if (selectedUser) {
      this._selectedUser = selectedUser;
      this.setFormInputValue(`@${selectedUser.name} `);
    }
  }

  get selectedUser() {
    return this._selectedUser;
  }

  @Input() config: IConfig = {
    placeholder: "message",
    buttonLabel: "send"
  };

  @Output() onMessage = new EventEmitter<string>();
  private _selectedUser: User;
  public inputForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    const name = this.selectedUser ? `@${this.selectedUser.name} ` : "";
    this.inputForm = this.fb.group({
      text: [name, Validators.required]
    });
  }

  private setFormInputValue(text: string) {
    if (this.inputForm) {
      this.inputForm.patchValue({
        text
      });
      this.nameField.nativeElement.focus();
    }
  }

  public onSubmit() {
    this.onMessage.emit(this.inputForm.value.text);
    this.inputForm.reset();
  }
}
