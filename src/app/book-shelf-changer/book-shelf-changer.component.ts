import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { book, BookEvent } from '../types';

@Component({
  selector: 'app-book-shelf-changer',
  templateUrl: './book-shelf-changer.component.html'
})
export class BookShelfChangerComponent {
  @Input() book: book;
  @Input() shelf: string;
  @Output() selectionChanged: EventEmitter<BookEvent> = new EventEmitter();

  update(book: book, event: any) {
    const eventPayload: BookEvent = {
      book: book,
      event: event
    };
    this.selectionChanged.emit(eventPayload);
  }
}
