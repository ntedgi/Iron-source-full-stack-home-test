import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import {Message, User} from '../../interfaces/';
import {Socket} from 'ngx-socket-io';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CONNECT,
  JOIN_ROOM,
  MESSAGE,
  GET_USERS_LIST,
  GET_MESSAGES_HISTORY,
  LEAVE_ROOM
} from './consts.js';

import {CHAT_ROOMS_URL} from '../../consts';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChatComponent {
  messages: Message[] = [];
  usersList: User[] = [];
  roomName: string;
  userNickName: string;

  @Output() onMessage = new EventEmitter<string>();

  public handleMessage(message: string): void {
    this.socket.emit(MESSAGE, {room: this.roomName, message, user: this.userNickName});
  }

  public handleLeaveChatRoom(): void {
    this.socket.emit(LEAVE_ROOM, {roomName: this.roomName});
    this.router.navigateByUrl(CHAT_ROOMS_URL);
  }

  constructor(private socket: Socket, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router
  ) {
    this.roomName = this.route.snapshot.queryParamMap.get('id');
    this.initSocketListener(this.roomName);
    this.userNickName = localStorage.getItem('nick_name');
    this.socket.emit(JOIN_ROOM, {roomName: this.roomName, nickName: this.userNickName});
  }


  private initSocketListener(roomName): void {
    this.socket.on(CONNECT, () => {
      console.log(`connected to socket`);
    });
    this.socket.on(MESSAGE, data => {
      this.messages = [...this.messages, {...data} as Message];
      this.cdr.markForCheck();
    });
    this.socket.on(GET_USERS_LIST, data => {
      console.log('GET_USERS_LIST');
      console.log(data);
      this.usersList = data.map((e: string) => {
        return {name: e} as User;
      });
      this.cdr.markForCheck();
    });
    this.socket.on(GET_MESSAGES_HISTORY, data => {
      this.messages = data.map((e: any) => ({...e} as Message));
      this.cdr.markForCheck();
    });
  }


}

