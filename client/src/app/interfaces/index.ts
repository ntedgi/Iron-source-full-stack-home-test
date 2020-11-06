export interface ChatRoom {
    name?: string;
    users?: number;
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
    id?: number;
    email?: string;
}

export interface IConfig {
    placeholder: string;
    buttonLabel: string;
}
