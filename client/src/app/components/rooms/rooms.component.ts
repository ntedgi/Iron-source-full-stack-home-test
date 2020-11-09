import {Component, OnInit} from '@angular/core';
import {ChatRoom} from '../../interfaces';
import {ChatRoomsService} from '../../services/chat-rooms-service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CHAT_URL} from '../../consts';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../services/login-service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [ChatRoomsService, HttpClient, FormBuilder]
})
export class RoomsComponent implements OnInit {

  rooms: ChatRoom[];
  selectChatRoom: ChatRoom;
  newRoom: FormGroup;

  constructor(private chatRoomsService: ChatRoomsService, private fb: FormBuilder, private router: Router, private auth: LoginService) {
    this.newRoom = this.fb.group({
      roomName: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
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
    const nickName = sessionStorage.getItem('nick-name');
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
