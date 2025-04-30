import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Idea } from '../../interfaces/idea.interface';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss',
})
export class IdeaComponent {
  protected readonly ideas = signal<Idea[]>([]);

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  private readonly router = inject(Router);
  private readonly ideaService = inject(IdeaService);

  constructor() {
    this.loadItems();
  }

  viewDetails(item: Idea): void {
    this.router.navigate(['/details', item.id]);
  }

  protected async loadItems() {
    try {
      const items = await this.ideaService.getItems();
      this.ideas.set(items);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }
}
