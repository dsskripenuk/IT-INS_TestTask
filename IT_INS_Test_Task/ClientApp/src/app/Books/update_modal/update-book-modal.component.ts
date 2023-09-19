import { BookService } from '../book.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book.model';

@Component({
  selector: 'app-update-book-modal',
  templateUrl: './update-book-modal.component.html',
})
export class UpdateBookModalComponent {
  @Input() bookData: Book = {} as Book;
  updateBookForm: FormGroup;

  newBook: Book = {
    title: this.bookData.title,
    publicationDate: this.bookData.publicationDate,
    description: this.bookData.description,
    pageCount: this.bookData.pageCount,
    id: this.bookData.id
  };

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private bookService: BookService) {
    this.updateBookForm = this.formBuilder.group({
      title: [this.bookData.title, Validators.required],
      description: [this.bookData.description, Validators.required],
      publishedDate: [this.bookData.publicationDate, Validators.required],
      pageCount: [this.bookData.pageCount, Validators.required]
    });
  }

  onSubmit() {
    this.bookService.updateBook(this.bookData.id, this.newBook).subscribe(
      (response) => {
        this.activeModal.close('Book added successfully');
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}