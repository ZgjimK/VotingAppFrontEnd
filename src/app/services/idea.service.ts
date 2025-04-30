import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Idea } from '../interfaces/idea.interface';
import { AddIdeaDto } from '../dtos/add-idea-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private readonly http = inject(HttpClient);

  private apiUrl = 'https://localhost:7276/api/ideas';

  public async getItems() {
    return await lastValueFrom(this.http.get<Idea[]>(this.apiUrl));
  }

  public async getIdeaById(id: number) {
    const url = `${this.apiUrl}/getIdea/${id}`;
    return await lastValueFrom(this.http.get<Idea>(url));
  }

  public async createIdea(idea: AddIdeaDto) {
    return await lastValueFrom(this.http.post<Idea>(this.apiUrl, idea));
  }

  public async upvote(id: number) {
    const url = `${this.apiUrl}/upvote/${id}`;
    return await lastValueFrom(this.http.post<Idea>(url, null));
  }
}
