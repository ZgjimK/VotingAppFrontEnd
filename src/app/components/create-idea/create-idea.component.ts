import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IdeaService } from '../../services/idea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-idea',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-idea.component.html',
  styleUrl: './create-idea.component.scss',
})
export class CreateIdeaComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly ideaService = inject(IdeaService);

  protected ideaForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  protected async onSubmit() {
    if (this.ideaForm.valid) {
      try {
        await this.ideaService.createIdea(this.ideaForm.getRawValue());
        this.ideaForm.reset();
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error creating idea:', error);
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
