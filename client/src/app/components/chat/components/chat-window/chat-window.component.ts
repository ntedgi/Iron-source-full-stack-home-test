import {
  Component,
  EventEmitter,
  Input,
  Output, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked
} from '@angular/core';
import {Message, User} from '../../../../interfaces';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {

  constructor(private cdr: ChangeDetectorRef) {

  }

  @ViewChild('scroll', {static: true}) scroll: ElementRef;
  @Input() messages: Message[];
  @Input() selectedUser: User;
  @Output() onMessage = new EventEmitter<string>();

  ngAfterViewChecked(): void {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
  }

  public handleMessage(message: string): void {
    this.onMessage.emit(message);
    this.cdr.markForCheck();
  }


  ngOnInit(): void {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
  }

}

