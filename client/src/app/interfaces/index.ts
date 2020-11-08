export interface ChatRoom {
    name?: string;
    usersCount?: number;
}

export interface Message {
    text: string;
    id: number;
    userId: number;
    timestamp: Date;
    userName?: string;
}

export interface User {
    name: string;
    email?: string;
}

export interface IConfig {
    placeholder: string;
    buttonLabel: string;
}
