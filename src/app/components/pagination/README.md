# Componente de Paginação Reutilizável

Este componente fornece uma solução completa e reutilizável para paginação em toda a aplicação.

## Características

- ✅ **Totalmente reutilizável** - Pode ser usado em qualquer componente
- ✅ **Configurável** - Mensagens personalizáveis e número de páginas visíveis
- ✅ **Responsivo** - Mostra indicadores inteligentes para muitas páginas
- ✅ **Acessível** - Botões com estados visuais claros
- ✅ **Inteligente** - Oculta botões quando não há itens ou apenas uma página

## Como Usar

### 1. Importar o Componente

```typescript
import { PaginationComponent } from './components/pagination/pagination.component';
```

### 2. Adicionar ao Módulo

```typescript
@NgModule({
  declarations: [
    // ... outros componentes
    PaginationComponent
  ]
})
export class AppModule { }
```

### 3. Usar no Template

```html
<app-pagination 
  [pagination]="paginationState"
  noItemsMessage="Nenhum usuário encontrado"
  itemsLabel="usuários"
  (pageChange)="onPageChange($event)">
</app-pagination>
```

## Inputs Disponíveis

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `pagination` | `PaginationState` | **Obrigatório** | Estado da paginação |
| `showTotal` | `boolean` | `true` | Mostra o total de itens |
| `maxVisiblePages` | `number` | `3` | Máximo de páginas visíveis |
| `noItemsMessage` | `string` | `'Nenhum item encontrado'` | Mensagem quando não há itens |
| `itemsLabel` | `string` | `'itens'` | Label para os itens |

## Outputs

| Output | Tipo | Descrição |
|--------|------|-----------|
| `pageChange` | `EventEmitter<number>` | Emite o número da página quando muda |

## Exemplo Completo

### Componente TypeScript

```typescript
import { Component, OnInit } from '@angular/core';
import { PaginationService, PaginationState } from './services/pagination.service';

@Component({
  selector: 'app-exemplo',
  template: `
    <div class="lista-itens">
      <div *ngFor="let item of itens">{{ item.nome }}</div>
    </div>
    
    <app-pagination 
      [pagination]="pagination"
      noItemsMessage="Nenhum resultado encontrado"
      itemsLabel="resultados"
      (pageChange)="carregarItens($event)">
    </app-pagination>
  `
})
export class ExemploComponent implements OnInit {
  itens: any[] = [];
  pagination: PaginationState;

  constructor(private paginationService: PaginationService) {
    this.pagination = this.paginationService.createPaginationState();
  }

  ngOnInit(): void {
    this.carregarItens(1);
  }

  carregarItens(page: number): void {
    // Lógica para carregar itens da API
    this.apiService.getItens(page).subscribe(response => {
      this.itens = response.itens;
      this.paginationService.updatePaginationState(
        this.pagination,
        response.totalPaginas,
        response.totalRegistros
      );
    });
  }
}
```

## Estados de Exibição

### 1. Sem Itens
```
┌─────────────────────────────┐
│   Nenhum módulo encontrado  │
└─────────────────────────────┘
```

### 2. Com Itens, Uma Página
```
┌─────────────────────────────┐
│        [Conteúdo]           │
└─────────────────────────────┘
```
*Não mostra botões de navegação*

### 3. Com Itens, Múltiplas Páginas
```
┌─────────────────────────────┐
│        [Conteúdo]           │
└─────────────────────────────┘
┌─────────────────────────────┐
│  ← [1] [2] [3] →           │
└─────────────────────────────┘
```

### 4. Com Muitas Páginas (Inteligente)
```
┌─────────────────────────────┐
│        [Conteúdo]           │
└─────────────────────────────┘
┌─────────────────────────────┐
│  ← [1] [2] [3] ••• →       │
└─────────────────────────────┘
```

## Personalização de Estilos

O componente usa CSS classes que podem ser sobrescritas:

```css
/* Personalizar mensagem de "nenhum item" */
.no-items-message p {
  color: #ff6b6b;
  font-size: 18px;
}

/* Personalizar botões de página */
.indicador-pagina {
  background-color: #4ecdc4;
}

.indicador-pagina.ativo {
  background-color: #45b7aa;
}
```

## Benefícios

- 🚀 **Desenvolvimento rápido** - Não precisa reimplementar paginação
- 🔧 **Manutenção fácil** - Lógica centralizada em um lugar
- 🎨 **Consistência visual** - Mesmo estilo em toda aplicação
- 📱 **Responsivo** - Funciona em todos os dispositivos
- ♿ **Acessível** - Estados visuais claros para usuários

