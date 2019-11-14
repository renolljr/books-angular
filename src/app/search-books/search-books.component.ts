import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { book, books, SearchBooksProps } from '../types';
import { BookService } from '../book.service';
import { Subscription, Subject, fromEvent } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styles: ['./search-books.component.css']
})
export class SearchBooksComponent
  implements OnInit, OnDestroy, AfterViewInit, SearchBooksProps {
  searchResults: books = [];
  query: string = '';
  books: books = [];
  loadBookSub$: Subscription;
  statusChanged$: Subscription;
  searchSub$: Subject<string> = new Subject();

  @ViewChild('searchInput', { static: false }) searchData: ElementRef;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    //TODO: Extract refactor this.
    this.loadBooks();
    this.statusChanged$ = this.bookService.bookStatusChanged.subscribe(() => {
      this.loadBooks();
    });
  }

  ngAfterViewInit() {
    const searchStream$ = fromEvent<any>(
      this.searchData.nativeElement,
      'keyup'
    ).pipe(
      map(event => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(criteria => this.searchV2(criteria)) //searchV2 returns an Observable
    );
    searchStream$.subscribe((results: books) => {
      results && results.length > 1
        ? this.setSearchResults(
            results.map((result: book) => {
              return this.getSearchedBook(result);
            })
          )
        : null;
    });
  }

  ngOnDestroy() {
    this.statusChanged$ ? this.statusChanged$.unsubscribe() : null;
    this.loadBooks ? this.loadBookSub$.unsubscribe() : null;
  }

  //TODO: Extract this.
  loadBooks() {
    this.loadBookSub$ = this.bookService
      .loadBooks()
      .subscribe((books: books) => {
        this.books = books;
      });
  }

  search = (event: any) => {
    const searchLimit: number = 100;
    const eventQuery = event.target.value;
    this.updateSearchQuery(eventQuery);

    eventQuery && eventQuery.length > 0
      ? this.bookService
          .searchBooks(eventQuery, searchLimit)
          .subscribe((results: books) => {
            results && results.length > 1
              ? this.setSearchResults(
                  results.map((result: book) => {
                    return this.getSearchedBook(result);
                  })
                )
              : null;
          })
      : (this.searchResults = []);
  };

  searchV2 = (event: any) => {
    const searchLimit: number = 100;
    this.updateSearchQuery(event);

    return event && event.length > 0
      ? this.bookService.searchBooks(event, searchLimit)
      : (this.searchResults = []);
  };

  private getSearchedBook = (result: book) => {
    let cabinet = this.books;
    let index = cabinet.findIndex(i => i.id === result.id);
    if (index !== -1) {
      return cabinet[index];
    } else {
      result.shelf = 'none';
      return result;
    }
  };

  private setSearchResults = (searchResults: book[]) => {
    searchResults && searchResults.length > 1
      ? (this.searchResults = searchResults)
      : (this.searchResults = []);
  };

  private updateSearchQuery(query: string) {
    this.query ? (this.query = query) : (this.query = '');
  }
}
