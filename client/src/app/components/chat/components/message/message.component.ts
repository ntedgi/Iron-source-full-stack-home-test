import { Component, Input } from "@angular/core";
import { Message } from "../../../../interfaces";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
  constructor() {}
  @Input() message: Message;
}
