import {
  Component, OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {Message, User} from '../../interfaces/';
import {Socket} from 'ngx-socket-io';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  selectedUser: User;
  usersList: User[] = [];
  roomName: string;
  userNickName: string;

  constructor(private socket: Socket, private cdr: ChangeDetectorRef, private route: ActivatedRoute
  ) {
    this.roomName = this.route.snapshot.queryParamMap.get('id');
    this.initSocketListener(this.roomName);
    this.userNickName = localStorage.getItem('nick_name');
    this.selectedUser = ({name: this.userNickName, id: 6} as User);


  }

  ngOnInit(): void {
    const messages = ['Bamboo Watch',
      'Black Watch',
      'Blue Band',
      'Blue T-Shirt',
      'Bracelet',
      'Brown Purse',
      'Chakra Bracelet',
      'Galaxy Earrings',
      'Game Controller',
      'Gaming Set',
      'Gold Phone Case'];

    this.usersList = messages.map((e: string, i: number) => {
      return {name: `${e}`, id: i} as User;
    });


    this.messages = messages.map((e: string, i: number) => {
      return {
        text: `${e} ${e}`,
        id: 6,
        userId: 6,
        timestamp: new Date(),
        userName: e
      } as Message;
    });
  }

  private sendMessage(): void {
    this.socket.emit('message', {room: this.roomName, message: 'hi!', user: this.userNickName});
    console.log('send hi');
  }

  // tslint:disable-next-line:typedef
  private initSocketListener(roomName) {
    this.socket.on('connect', () => {
      console.log(`connected to socket`);
      this.socket.emit('join room', {roomName});
    });
    this.socket.on('message', data => {
      console.log('hi from server');
    });
    setInterval(this.sendMessage.bind(this), 3000);
  }

  public handleUserSelect(user: User): void {
    this.selectedUser = user;
  }

}

