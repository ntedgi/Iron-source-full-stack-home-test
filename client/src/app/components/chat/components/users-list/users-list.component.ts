import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from "@angular/core";
import { User } from "../../../../interfaces";

@Component({
  selector: "users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  @Input() usersList: User[];
  @Output() onUserSelect = new EventEmitter<User>();

  constructor() {}
  public selectUser(user: User) {
    this.onUserSelect.emit(user);
  }
}
