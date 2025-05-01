import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Idea } from '../interfaces/idea.interface';
import { AddIdeaDto } from '../dtos/add-idea-dto.interface';
import { environment } from '../assets/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  public async getItems() {
    console.log(this.apiUrl);
    return await lastValueFrom(this.http.get<Idea[]>(`${this.apiUrl}/ideas`));
  }

  public async getIdeaById(id: number) {
    const url = `${this.apiUrl}/ideas/getIdea/${id}`;
    return await lastValueFrom(this.http.get<Idea>(url));
  }

  public async createIdea(idea: AddIdeaDto) {
    return await lastValueFrom(
      this.http.post<Idea>(`${this.apiUrl}/ideas`, idea)
    );
  }

  public async upvote(id: number) {
    const url = `${this.apiUrl}/ideas/upvote/${id}`;
    return await lastValueFrom(this.http.post<Idea>(url, null));
  }
}
