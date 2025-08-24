import { Injectable } from '@angular/core';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface PaginationConfig {
  maxVisiblePages?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  
  /**
   * Calcula as páginas visíveis para a paginação
   */
  getPaginationPages(pagination: PaginationState, config: PaginationConfig = {}): number[] {
    const { maxVisiblePages = 3 } = config;
    const total = pagination.totalPages;
    const current = pagination.currentPage;
    
    if (total <= maxVisiblePages) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    if (current === 1) {
      return Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
    } else if (current === total) {
      return Array.from({ length: maxVisiblePages }, (_, i) => total - maxVisiblePages + i + 1);
    } else {
      const start = Math.max(1, current - Math.floor(maxVisiblePages / 2));
      const end = Math.min(total, start + maxVisiblePages - 1);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  }

  /**
   * Verifica se deve mostrar o indicador de mais páginas à esquerda
   */
  shouldShowLeftIndicator(pagination: PaginationState, config: PaginationConfig = {}): boolean {
    const { maxVisiblePages = 3 } = config;
    return pagination.totalPages > maxVisiblePages && pagination.currentPage > Math.ceil(maxVisiblePages / 2);
  }

  /**
   * Verifica se deve mostrar o indicador de mais páginas à direita
   */
  shouldShowRightIndicator(pagination: PaginationState, config: PaginationConfig = {}): boolean {
    const { maxVisiblePages = 3 } = config;
    return pagination.totalPages > maxVisiblePages && pagination.currentPage < pagination.totalPages - Math.floor(maxVisiblePages / 2);
  }

  /**
   * Verifica se pode ir para a próxima página
   */
  canGoToNextPage(pagination: PaginationState): boolean {
    return pagination.currentPage < pagination.totalPages;
  }

  /**
   * Verifica se pode ir para a página anterior
   */
  canGoToPreviousPage(pagination: PaginationState): boolean {
    return pagination.currentPage > 1;
  }

  /**
   * Verifica se pode ir para uma página específica
   */
  canGoToPage(pagination: PaginationState, page: number): boolean {
    return page >= 1 && page <= pagination.totalPages;
  }

  /**
   * Navega para a próxima página
   */
  nextPage(pagination: PaginationState): void {
    if (this.canGoToNextPage(pagination)) {
      pagination.currentPage += 1;
    }
  }

  /**
   * Navega para a página anterior
   */
  previousPage(pagination: PaginationState): void {
    if (this.canGoToPreviousPage(pagination)) {
      pagination.currentPage -= 1;
    }
  }

  /**
   * Navega para uma página específica
   */
  goToPage(pagination: PaginationState, page: number): void {
    if (this.canGoToPage(pagination, page)) {
      pagination.currentPage = page;
    }
  }

  /**
   * Cria um novo estado de paginação
   */
  createPaginationState(): PaginationState {
    return {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    };
  }

  /**
   * Atualiza o estado de paginação com dados da API
   */
  updatePaginationState(pagination: PaginationState, totalPages: number, totalItems: number): void {
    pagination.totalPages = totalPages;
    pagination.totalItems = totalItems;
  }
}
