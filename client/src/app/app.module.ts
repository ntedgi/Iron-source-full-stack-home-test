import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModuleLoaders } from './primeng-imports'
import { HttpClientModule } from '@angular/common/http';

// pages
import { ChatComponent } from './components/chat/chat.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LoginComponent } from './components/login/login.component'
// components
import { InputFieldComponent } from './components/core/input-field/input-field.component'
import { MessageComponent } from './components/chat/components/message/message.component'
import { ChatWindowComponent } from './components/chat/components/chat-window/chat-window.component'
// services
import { ChatRoomsService } from "./services/chatRoomsService";


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    RoomsComponent,
    LoginComponent,
    InputFieldComponent,
    MessageComponent,
    ChatWindowComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNgModuleLoaders
  ],
  providers: [ChatRoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
