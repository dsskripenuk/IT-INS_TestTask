import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
})
export class AddBookModalComponent implements OnInit {
  newBook: Book = {
    title: '',
    publicationDate: new Date(),
    description: '',
    pageCount: 0,
    id: 0
  };

  constructor(public activeModal: NgbActiveModal, private bookService: BookService) { } // Внімання: activeModal - це об'єкт для керування модальним вікном

  ngOnInit() { }

  closeModal() {
    this.activeModal.dismiss('cancel');
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe(
      (response) => {
        this.activeModal.close('Book added successfully');
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}