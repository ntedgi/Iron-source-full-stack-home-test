import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

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
import { ChatWindowComponent } from './components/chat/components/chat-window/chat-window.component'
import { MessageComponent } from './components/chat/components/message/message.component'
import { ChatInputComponent } from './components/chat/components/chat-input/chat-input.component'
import { UsersListComponent } from './components/chat/components/users-list/users-list.component'
// providers
import { ChatRoomsService } from "./services/chatRoomsService";
import { LoginService } from './services/loginService'
import { FormBuilder } from "@angular/forms";
import { SigninComponent } from './components/login/componenets/signin/signin.component';
import { SignupComponent } from './components/login/componenets/signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    RoomsComponent,
    LoginComponent,
    InputFieldComponent,
    MessageComponent,
    ChatWindowComponent,
    ChatInputComponent,
    UsersListComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNgModuleLoaders,
    ReactiveFormsModule
  ],
  providers: [ChatRoomsService, FormBuilder, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
