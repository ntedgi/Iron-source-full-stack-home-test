import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsLoginGuard} from './guards/is-login.guard';
import {ChatComponent} from './components/chat/chat.component';
import {RoomsComponent} from './components/rooms/rooms.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {
  CHAT_ROOMS_URL,
  CHAT_URL
} from './consts';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: CHAT_URL, component: ChatComponent, canActivate: [IsLoginGuard]},
  {path: CHAT_ROOMS_URL, component: RoomsComponent, canActivate: [IsLoginGuard]},
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
