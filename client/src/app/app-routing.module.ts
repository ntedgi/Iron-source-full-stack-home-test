import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { ChatComponent } from './components/chat/chat.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: ChatComponent },
  { path: "chat", component: ChatComponent },
  { path: "rooms", component: RoomsComponent  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
