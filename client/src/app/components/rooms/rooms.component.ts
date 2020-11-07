import {Component, OnInit} from '@angular/core';
import {ChatRoom} from '../../interfaces';
import {ChatRoomsService} from '../../services/chatRoomsService';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
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

  newRoom: FormGroup;

  constructor(private chatRoomsService: ChatRoomsService, private fb: FormBuilder, private router: Router) {
    this.newRoom = this.fb.group({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit() {
    this.chatRoomsService.getAllAvailableChatRooms().then(availableRooms => {
        const {data} = availableRooms;
        this.rooms = data.rooms.map(e => e as ChatRoom);
      }
    );

  }

  updateChart(): void {
    this.chatRoomsService.getAllAvailableChatRooms().then(availableRooms => {
        const {data} = availableRooms;
        this.rooms = data.rooms.map(e => e as ChatRoom);
      }
    );
  }

  createRoom(): void {
    const nickName = localStorage.getItem('nick_name');
    this.chatRoomsService.createChatRooms(this.newRoom.controls.roomName.value, nickName).then(
      e => {
        this.updateChart();
      }
    );
  }

  onRowSelect(event): void {
    this.router.navigateByUrl(`/${CHAT_URL}?id=${event.data.name}`);
  }


}
