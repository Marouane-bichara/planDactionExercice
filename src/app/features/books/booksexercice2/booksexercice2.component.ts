import { Component, inject } from '@angular/core';
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
    books = toSignal(this.bookService.getBooks(), {
        initialValue: []
      }); 


      
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


     
        onSubmitUpdate(): void {
          if (this.updateForm.invalid) return;

          const book: Book = this.updateForm.value;
          console.log('book updated');

          this.bookService.updateBook(book.id, book).subscribe({
            next: () => {
              console.log('book updated');
            },
            error: () => {
              this.error = 'update failed';
            }
          });
        }









}
