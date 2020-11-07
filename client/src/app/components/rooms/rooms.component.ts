import {Component, OnInit} from '@angular/core';


import {ChatRoom} from '../../interfaces';
import {ChatRoomsService} from '../../services/chatRoomsService';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: ChatRoom[];
  selectedProduct1: ChatRoom;

  constructor(private chatRoomsService: ChatRoomsService) {
  }

  ngOnInit() {
    this.chatRoomsService.getAllAvailableChatRooms().then(availableRooms => {
        const {data} = availableRooms;
        this.rooms = data.rooms.map(e => e as ChatRoom);
      }
    );
  }

  onRowSelect(event): void {
    console.log(event.data.name);
  }


}
