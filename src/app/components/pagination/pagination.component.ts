import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationState, PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pagination!: PaginationState;
  @Input() showTotal: boolean = true;
  @Input() maxVisiblePages: number = 3;
  @Input() noItemsMessage: string = 'Nenhum item encontrado';
  @Input() itemsLabel: string = 'itens';
  @Output() pageChange = new EventEmitter<number>();

  constructor(private paginationService: PaginationService) {}

  get paginationPages(): number[] {
    return this.paginationService.getPaginationPages(this.pagination, { maxVisiblePages: this.maxVisiblePages });
  }

  get shouldShowLeftIndicator(): boolean {
    return this.paginationService.shouldShowLeftIndicator(this.pagination, { maxVisiblePages: this.maxVisiblePages });
  }

  get shouldShowRightIndicator(): boolean {
    return this.paginationService.shouldShowRightIndicator(this.pagination, { maxVisiblePages: this.maxVisiblePages });
  }

  get canGoToNextPage(): boolean {
    return this.paginationService.canGoToNextPage(this.pagination);
  }

  get canGoToPreviousPage(): boolean {
    return this.paginationService.canGoToPreviousPage(this.pagination);
  }

  get hasItems(): boolean {
    return this.pagination.totalItems > 0;
  }

  get shouldShowPagination(): boolean {
    return this.pagination.totalPages > 1;
  }

  nextPage(): void {
    if (this.canGoToNextPage) {
      this.paginationService.nextPage(this.pagination);
      this.pageChange.emit(this.pagination.currentPage);
    }
  }

  previousPage(): void {
    if (this.canGoToPreviousPage) {
      this.paginationService.previousPage(this.pagination);
      this.pageChange.emit(this.pagination.currentPage);
    }
  }

  goToPage(page: number): void {
    if (this.paginationService.canGoToPage(this.pagination, page)) {
      this.paginationService.goToPage(this.pagination, page);
      this.pageChange.emit(this.pagination.currentPage);
    }
  }
}
