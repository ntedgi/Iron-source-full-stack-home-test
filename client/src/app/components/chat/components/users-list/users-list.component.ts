import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {User} from '../../../../interfaces';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  @Input() usersList: User[] = [];

  constructor() {
  }

}
