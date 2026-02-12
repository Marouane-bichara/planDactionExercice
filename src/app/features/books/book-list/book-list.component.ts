import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  searchTerm = '';

  books: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert Martin', available: true, category: 'Programming', publishedYear: 2008 },
    { id: 2, title: '1984', author: 'George Orwell', available: false, category: 'Fiction', publishedYear: 1949 },
    { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', available: true, category: 'Programming', publishedYear: 1999 },
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', available: true, category: 'History', publishedYear: 2011 },
    { id: 5, title: 'Dune', author: 'Frank Herbert', available: false, category: 'Fiction', publishedYear: 1965 },
  ];

  ;toggleAvailability(book: Book) {
    book.available = !book.available;
  }

  get availableBooksCount(): number {
    return this.books.filter(b => b.available).length;
  }
}
