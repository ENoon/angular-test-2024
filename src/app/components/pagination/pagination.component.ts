import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

}

