import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookItem } from '../../interfaces/book.interface';
import { BookCardComponent } from '../book-card/book-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [BookCardComponent, PaginationComponent, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  books : BookItem[] = [];
  currPage: number = 1;
  totalPages: number = 1;
  selectedAuthor: string = ""; // DEFAULT VALUE
  authors : string[] = [];
  constructor(private bookService : BookService){} // injecting the book service

  ngOnInit(): void {
    this.loadBooks(this.currPage);
    this.bookService.bookFilter().subscribe(res => {this.authors = res.author});
    console.log("AUTHORS: ", this.authors);
  }
  goToPage(page: number) {
    this.currPage = page;
    this.loadBooks(page);
  }
  loadBooks(page: number){
    this.bookService.getBooks(page,12,"", this.selectedAuthor).subscribe(res => {
      this.books = res.data; // populate books array with API response , got all book objects
      this.totalPages = res.totalPages; // totalPages from the server-side
    })
  }

  filterByAuthor() {
    this.loadBooks(1);
  }

  resetAuthor(){
    this.selectedAuthor = "";
    this.loadBooks(1);
  }
}
