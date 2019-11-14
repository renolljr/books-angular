import { Component, OnInit, OnDestroy } from '@angular/core';
import { book, books, ListBooksProps, sectionID } from '../types';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listbooks',
  templateUrl: './listbooks.component.html',
  styles: ['./listbooks.component.css']
})
export class ListbooksComponent implements OnInit, OnDestroy, ListBooksProps {
  books: books;
  sections: sectionID[] = [
    { id: 'currentlyReading', title: 'Currently Reading' },
    { id: 'wantToRead', title: 'Want to Read' },
    { id: 'read', title: 'Read' }
  ];
  loadBookSub$: Subscription;
  statusChanged$: Subscription;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
    this.statusChanged$ = this.bookService.bookStatusChanged.subscribe(() => {
      this.loadBooks();
    });
  }

  loadBooks() {
    this.loadBookSub$ = this.bookService
      .loadBooks()
      .subscribe((books: books) => {
        this.books = books;
      });
  }

  getBooksForShelf(books: books, section: sectionID) {
    return books && books.length > 0
      ? books.filter(book => book.shelf === section.id)
      : [];
  }

  ngOnDestroy() {
    this.statusChanged$ ? this.statusChanged$.unsubscribe() : null;
    this.loadBooks ? this.loadBookSub$.unsubscribe() : null;
  }
}
