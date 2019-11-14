import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { book } from '../types';

interface IBookEvent {
  book: book;
  event: any;
}
@Component({
  selector: 'app-book-shelf-changer',
  templateUrl: './book-shelf-changer.component.html'
})
export class BookShelfChangerComponent {
  @Input() book: book;
  @Input() shelf: string;
  @Output() selectionChanged: EventEmitter<IBookEvent> = new EventEmitter();

  update(book: book, event: any) {
    const eventPayload: IBookEvent = {
      book: book,
      event: event
    };
    this.selectionChanged.emit(eventPayload);
  }
}
