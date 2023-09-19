import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookModalComponent } from './modal/add-book-modal.component'; 
import { UpdateBookModalComponent } from './update_modal/update-book-modal.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = this.books;
  searchText: string = ''; 
  selectedFilter: string = 'all';
  startDate: Date = new Date();
  endDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private bookService: BookService, private modalService: NgbModal) {
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'YYYY-MM-DD'
    };
   }

  ngOnInit(): void {
    this.loadBooks();
  }

  onSearch() {
    console.log(this.searchText)
    if (this.searchText) {
      this.filteredBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log(this.books)
    } else {
      this.filteredBooks = this.books;
    }
  }
  
  openAddBookModal() {
    const modalRef = this.modalService.open(AddBookModalComponent);
  
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadBooks();
      }
    }).catch((error) => {
    });
  }

  openUpdateBookModal(book: Book) {
    const modalRef = this.modalService.open(UpdateBookModalComponent);
    modalRef.componentInstance.bookData = book;

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadBooks();
      }
    }).catch((error) => {
    });
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
      console.log(books);
    });
  }

  addNewBook(newBook: Book) {
    this.bookService.addBook(newBook).subscribe((result) => {
      this.books.push(result);
      console.log(result);
    });
  }

  updateBook(id: number, updatedBookData: Book): void {
    this.bookService.updateBook(id, updatedBookData).subscribe(updatedBook => {
      const index = this.books.findIndex(book => book.id === id);
      if (index !== -1) {
        this.books[index] = updatedBook;
      }
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }

  applyFilters() {

    this.filteredBooks = this.books.filter(book => {
      const isDateMatch = this.filterByDate(book.publicationDate);
      return isDateMatch;
    });
  }
  filterByDate(publicationDate: Date): boolean {
    const today = new Date();
    switch (this.selectedFilter) {
      case 'thisMonth':
        console.log(publicationDate.getMonth)
        return (
          publicationDate.getMonth === today.getMonth &&
          publicationDate.getFullYear === today.getFullYear
        );
      case 'thisYear':
        return publicationDate.getFullYear === today.getFullYear;
      default:
        return true;
    }
  }  

  filterByDateRange() {
    if (this.startDate && this.endDate) {
      this.filteredBooks = this.books.filter(book => {
        const publicationDate = new Date(book.publicationDate);
        return publicationDate >= this.startDate && publicationDate <= this.endDate;
      });
    } else {
      this.filteredBooks = this.books;
    }
  }
}
