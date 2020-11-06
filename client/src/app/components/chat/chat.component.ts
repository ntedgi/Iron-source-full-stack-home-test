import { Component, OnInit } from '@angular/core';
import { Message, User } from '../../interfaces/'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  selectedUser: User;
  usersList: User[] = [];

  constructor() { }

  ngOnInit(): void {
    const messages = ["Bamboo Watch",
      "Black Watch",
      "Blue Band",
      "Blue T-Shirt",
      "Bracelet",
      "Brown Purse",
      "Chakra Bracelet",
      "Galaxy Earrings",
      "Game Controller",
      "Gaming Set",
      "Gold Phone Case"]

    this.selectedUser = <User>{ name: "string", id: 6 }
    this.usersList = messages.map((e: string, i: number) => {
      return <User>{name: `${e}`,id: i}})


    this.messages = messages.map((e: string, i: number) => {
      return <Message>{
        text: `${e} ${e}`,
        id: 6,
        userId: 6,
        timestamp: new Date(),
        userName: e
      }
    })
  }

  public handleUserSelect(user: User) {
    this.selectedUser = user;
  }

}

