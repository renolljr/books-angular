import { Injectable } from '@angular/core';
import { book, books } from './types';
import { from } from 'rxjs';

export const getToken = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};

@Injectable()
export class ApiService {
  private token: any = !localStorage.token ? getToken() : localStorage.token;
  private api: string = 'https://reactnd-books-api.udacity.com';
  private headers = {
    Accept: 'application/json',
    Authorization: this.token
  };

  get = (bookId: string) =>
    from(
      fetch(`${this.api}/books/${bookId}`, { headers: this.headers })
        .then(res => res.json())
        .then(data => data.book as book)
    );

  getAll = () =>
    from(
      fetch(`${this.api}/books`, { headers: this.headers })
        .then(res => res.json())
        .then(data => data.books as books)
    );

  update = (book: book, shelf: string) =>
    from(
      fetch(`${this.api}/books/${book.id}`, {
        method: 'PUT',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shelf })
      }).then(res => res.json())
    );

  search = (query: string, maxResults: number) =>
    from(
      fetch(`${this.api}/search`, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, maxResults })
      })
        .then(res => res.json())
        .then(data => data.books as books)
    );
}
