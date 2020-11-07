import {Component, OnInit} from '@angular/core';
import {ChatRoom} from '../../interfaces';
import {ChatRoomsService} from '../../services/chatRoomsService';
import {Router} from '@angular/router';
import {CHAT_URL} from '../../consts';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: ChatRoom[];
  selectChatRoom: ChatRoom;

  constructor(private chatRoomsService: ChatRoomsService, private router: Router) {
  }

  ngOnInit() {
    this.chatRoomsService.getAllAvailableChatRooms().then(availableRooms => {
        const {data} = availableRooms;
        this.rooms = data.rooms.map(e => e as ChatRoom);
      }
    );
  }

  onRowSelect(event): void {
    this.router.navigateByUrl(`/${CHAT_URL}?id=${event.data.name}`);
  }


}
