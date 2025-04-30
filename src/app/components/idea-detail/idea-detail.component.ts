import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../interfaces/idea.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-idea-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './idea-detail.component.html',
  styleUrl: './idea-detail.component.scss',
})
export class IdeaDetailComponent {
  private ideaService = inject(IdeaService);
  private readonly route = inject(ActivatedRoute);
  protected disabled = signal(false);

  protected idea = signal<Idea | null>(null);

  constructor() {
    this.getIdea();
  }

  protected async getIdea() {
    try {
      const idea = await this.ideaService.getIdeaById(
        Number(this.route.snapshot.paramMap.get('id'))
      );
      this.idea.set(idea);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  protected async upvote() {
    try {
      this.disabled.set(true);
      this.idea.update((idea) => ({ ...idea!, votes: idea!.votes + 1 }));
      await this.ideaService.upvote(this.idea()!.id);
    } catch (error) {
      this.idea.update((idea) => ({ ...idea!, votes: idea!.votes - 1 }));
      console.error('Error loading items:', error);
    } finally {
      this.disabled.set(false);
    }
  }
}
