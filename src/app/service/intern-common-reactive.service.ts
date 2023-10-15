import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtilityService } from './app-utility.service';
import { CompanyResponse } from '../model/Response/CompanyResponse';
import { Observable, map, shareReplay } from 'rxjs';
import { intern_common_reactive_service } from 'src/assets/environments/environment.dev';
import { Response } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class InternCommonReactiveService {

  constructor(private httpClient: HttpClient, private appUtilityService: AppUtilityService) { }

  getCompanies(): Observable<CompanyResponse[]> {
    return this.httpClient.get<Response>(intern_common_reactive_service.companies)
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }
}
