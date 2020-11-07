import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {ChatRoom} from '../interfaces';

@Injectable()
export class ChatRoomsService {
  rooms: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
  ];

  constructor(private http: HttpClient) {
  }

  getAllAvailableChatRooms(): Promise<any> {
    return this.http.get<any>('/api/rooms').toPromise();
  }

  createChatRooms(roomName, creator): Promise<any> {
    return this.http.post<any>('/api/rooms',{roomName, creator}).toPromise();
  }


}
