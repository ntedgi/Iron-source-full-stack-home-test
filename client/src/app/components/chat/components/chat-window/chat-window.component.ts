import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {Message, User} from '../../../../interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent {

  constructor() {
  }

  @Input() messages: Message[];
  @Input() selectedUser: User;
  @Output() onMessage = new EventEmitter<string>();




  public handleMessage(message: string): void {
    this.onMessage.emit(message);
  }
}
