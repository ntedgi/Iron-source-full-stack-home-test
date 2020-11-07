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

  constructor(private socket: Socket, private cdr: ChangeDetectorRef, private route: ActivatedRoute
  ) {
    const roomName: string = this.route.snapshot.queryParamMap.get('id');
    this.initSocketListener(roomName);
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

    const userNickName = localStorage.getItem('nickName');
    this.selectedUser = <User> {name: userNickName, id: 6};
    this.usersList = messages.map((e: string, i: number) => {
      return <User> {name: `${e}`, id: i};
    });


    this.messages = messages.map((e: string, i: number) => {
      return <Message> {
        text: `${e} ${e}`,
        id: 6,
        userId: 6,
        timestamp: new Date(),
        userName: e
      };
    });
  }

  private sendMessage(): void {
    const roomName: string = this.route.snapshot.queryParamMap.get('id');
    this.socket.emit('message', {room: roomName, message: 'hi!', user: this.selectedUser});
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

  public handleUserSelect(user: User) {
    this.selectedUser = user;
  }

}

