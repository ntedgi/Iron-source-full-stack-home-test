import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ChatRoomsService {
  constructor(private http: HttpClient) {
  }

  getAllAvailableChatRooms(): Promise<any> {
    return this.http.get<any>('/api/rooms').toPromise();
  }

  createChatRooms(roomName, creator): Promise<any> {
    return this.http.post<any>('/api/rooms', {roomName, creator}).toPromise();
  }


}
