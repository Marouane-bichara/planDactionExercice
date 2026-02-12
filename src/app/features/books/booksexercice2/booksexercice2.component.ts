import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../../models/book';
import { BookService } from '../../../core/services/book.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-booksexercice2',
    standalone: true,
  imports: [CommonModule, FormsModule , ReactiveFormsModule],
  templateUrl: './booksexercice2.component.html',
  styleUrl: './booksexercice2.component.css'
})
export class Booksexercice2Component {


    private bookService = inject(BookService)
    private fb = inject(FormBuilder)
    loading = false;
    error = '';

    books = signal<Book[]>([]);


    constructor() {
  this.loadBooks();
}
    loadBooks() {
      this.bookService.getBooks().subscribe({
        next: (data) => this.books.set(data),
        error: () => (this.error = 'Failed to load books')
      });
}

      
      updateForm: FormGroup = this.fb.group({
        id: ['', Validators.required],
        title: ['', Validators.required],
        author: ['', Validators.required],
        available: ['', Validators.required],
        category: ['', Validators.required],
        publishedYear: ['', Validators.required]
      });


      selectBook(book: Book) {
          this.updateForm.patchValue(book);
        }


     
        onSubmitDelete(id : number): void{
            this.bookService.deleteBook(id).subscribe({
              next:() =>{
                console.log("Book deleted");
                const updateBook = this.books().filter(b => b.id !== id);
                this.books.set(updateBook);
              } ,
              error : ()=>{
                this.error = 'delete failed'
              }
            })
        }
        onSubmitUpdate(): void {
          if (this.updateForm.invalid) return;


          const book: Book = this.updateForm.value;
          console.log('book updated');

          this.bookService.updateBook(book.id, book).subscribe({
            next: () => {
              console.log('book updated');
              // this.books = toSignal(this.bookService.getBooks() , {initialValue: []})
              const updatedBooks = this.books().map(b => b.id === book.id ? book : b)
      this.books.set(updatedBooks);         
        },
            error: () => {
              this.error = 'update failed';
            }
          });
        }









}
