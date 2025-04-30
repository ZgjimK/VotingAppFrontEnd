import { Routes } from '@angular/router';
import { IdeaComponent } from './components/idea/idea.component';
import { IdeaDetailComponent } from './components/idea-detail/idea-detail.component';
import { CreateIdeaComponent } from './components/create-idea/create-idea.component';

export const routes: Routes = [
  { path: '', component: IdeaComponent },
  { path: 'details/:id', component: IdeaDetailComponent },
  { path: 'create', component: CreateIdeaComponent },
];
