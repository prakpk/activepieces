import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@activepieces/ui/common';
import {
  AcceptInvitationRequest,
  ListProjectMembersRequest,
  ProjectMember,
  SendInvitationRequest,
} from '@activepieces/ee-shared';
import { SeekPage } from '@activepieces/shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectMemberService {
  constructor(private http: HttpClient) {}

  accept(request: AcceptInvitationRequest): Observable<void> {
    return this.http.post<void>(
      environment.apiUrl + '/project-members/accept',
      request
    );
  }

  invite(request: SendInvitationRequest): Observable<void> {
    return this.http.post<void>(
      environment.apiUrl + '/project-members/invite',
      request
    );
  }

  delete(invitationId: string): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + '/project-members/' + invitationId
    );
  }

  list(
    request: ListProjectMembersRequest
  ): Observable<SeekPage<ProjectMember>> {
    const queryParams: { [key: string]: string | number } = {
      limit: request.limit ?? 10,
      cursor: request.cursor || '',
    };
    return this.http.get<SeekPage<ProjectMember>>(
      environment.apiUrl + '/project-members',
      {
        params: queryParams,
      }
    );
  }
}
