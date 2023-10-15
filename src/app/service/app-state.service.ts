import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private loadingStatus: boolean = false;
  private errorStatus: boolean = false;
  // private errorResponse: Response;

  constructor() { }

  setLoadStatus(loadingStatus: boolean): void {
    this.loadingStatus = loadingStatus;
  }

  getLoadStatus(): boolean {
    return this.loadingStatus;
  }

  setErrorStatus(errorStatus: boolean): void {
    this.errorStatus = errorStatus;
  }

  getErrorStatus(): boolean {
    return this.errorStatus;
  }

  // setErrorResponse(errorResponse: Response): void {
  //   this.errorResponse = errorResponse;
  // }

  // getErrorResponse(): Response {
  //   return this.errorResponse;
  // }

  // getResponseError(): string {
  //   if (this.errorResponse) {
  //     return this.errorResponse.error!;
  //   } else {
  //     return '';
  //   }
  // }
}
