import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

export const routes: Routes = [

     { 
    path: '', 
    redirectTo: '/books-list', 
    pathMatch: 'full' 
  },

    {
        path : 'books-list',
        loadComponent: ()=> import("./features/books/book-list/book-list.component")
        .then(m => m.BookListComponent)
    } ,

    {
        path : "books-2",
        loadComponent : ()=> import("./features/books/booksexercice2/booksexercice2.component")
        .then(m => m.Booksexercice2Component),
    }
];
