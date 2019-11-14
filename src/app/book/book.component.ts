import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { book, BookProps } from '../types';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

interface IBookEvent {
  book: book;
  event: any;
}
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: []
})
export class BookComponent implements OnInit, OnDestroy, BookProps {
  @Input() book: book;
  @Input() shelf: string;

  update$: Subscription;

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  update($event: IBookEvent) {
    this.update$ = this.bookService
      .updateBooks($event.book, $event.event.target.value)
      .subscribe(() => {
        this.bookService.bookStatusChanged.next(true);
      });
  }

  ngOnDestroy() {
    this.update$ ? this.update$.unsubscribe() : null;
  }
}
