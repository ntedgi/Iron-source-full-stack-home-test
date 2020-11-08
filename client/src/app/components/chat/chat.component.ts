import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import {Message, User} from '../../interfaces/';
import {Socket} from 'ngx-socket-io';
import {ActivatedRoute} from '@angular/router';
import {
  CONNECT,
  JOIN_ROOM,
  MESSAGE,
  GET_USERS_LIST,
  GET_MESSAGES_HISTORY,
} from './consts.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  usersList: User[] = [];
  roomName: string;
  userNickName: string;

  @Output() onMessage = new EventEmitter<string>();

  public handleMessage(message: string): void {
    this.socket.emit(MESSAGE, {room: this.roomName, message, user: this.userNickName});
  }

  constructor(private socket: Socket, private cdr: ChangeDetectorRef, private route: ActivatedRoute
  ) {
    this.roomName = this.route.snapshot.queryParamMap.get('id');
    this.initSocketListener(this.roomName);
    this.userNickName = localStorage.getItem('nick_name');


  }

  ngOnInit(): void {

  }

  private sendMessage(): void {
    this.socket.emit(MESSAGE, {room: this.roomName, message: 'hi!', user: this.userNickName});
    console.log('send hi');
  }

  private initSocketListener(roomName): void {
    this.socket.on(CONNECT, () => {
      console.log(`connected to socket`);
      this.socket.emit(JOIN_ROOM, {roomName, nickName: this.userNickName});
    });
    this.socket.on(MESSAGE, data => {
      this.messages.push({...data} as Message);
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

