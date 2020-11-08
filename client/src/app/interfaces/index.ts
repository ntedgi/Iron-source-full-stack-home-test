export interface ChatRoom {
  name?: string;
  usersCount?: number;
}

export interface Message {
  message: string;
  sender: number;
  timestamp: Date;
}

export interface User {
  name: string;
  email?: string;
}
