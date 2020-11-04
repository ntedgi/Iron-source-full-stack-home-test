import { Component, OnInit } from '@angular/core';


import { ChatRoom } from '../../interfaces'
import { ChatRoomsService } from '../../services/chatRoomsService'
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  products: ChatRoom[];
  selectedProduct1: ChatRoom;


  constructor(private chatRoomsService: ChatRoomsService) { }

  ngOnInit() {
    this.products = this.chatRoomsService.getAllAvailableChatRooms();
  }

  selectProduct(product: ChatRoom) {
  }


  onRowSelect(event) {
    console.log(event.data.name)
  }


}
