import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intern_user_reactive_service } from 'src/assets/environments/environment.dev';
import { StudentResponse } from '../model/Response/StudentResponse';
import { Observable, map, shareReplay } from 'rxjs';
import { Response } from '../model/Response';
import { AppUtilityService } from './app-utility.service';
import { AcademicSupervisorResponse } from '../model/Response/AcademicSupervisorResponse';
import { AcademicSupervisorRequest } from '../model/Request/AcademicSupervisorRequest';
import { ObjectData } from '../model/ObjectData';
import { IndustrySupervisorRequest } from '../model/Request/IndustrySupervisorRequest';
import { IndustrySupervisorResponse } from '../model/Response/IndustrySupervisorResponse';
import { StudentRequest } from '../model/Request/StudentRequest';

@Injectable({
  providedIn: 'root'
})
export class InternUserReactiveService {

  constructor(private httpClient: HttpClient, private appUtilityService: AppUtilityService) { }

  getStudents(): Observable<StudentResponse[]> {
    return this.httpClient.get<Response>(intern_user_reactive_service.students)
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }

  getStudent(studentMatricNumber: string): Observable<StudentResponse> {
    return this.httpClient.get<Response>(intern_user_reactive_service.student + `/${studentMatricNumber}`)
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }

  updateStudent(student: StudentRequest, cvFile: File, mtFile: File, clFile: File, coFile: File, slFile: File): Observable<StudentResponse> {
    let objects: ObjectData[] = [];
    objects.push({ object: student, objectName: 'request', objectFormat: 'JSON' });
    objects.push({ object: cvFile, objectName: 'cvFile', objectFormat: '' });
    objects.push({ object: mtFile, objectName: 'mtFile', objectFormat: '' });
    objects.push({ object: clFile, objectName: 'clFile', objectFormat: '' });
    objects.push({ object: coFile, objectName: 'coFile', objectFormat: '' });
    objects.push({ object: slFile, objectName: 'slFile', objectFormat: '' });
    
    return this.httpClient.put<Response>(`${intern_user_reactive_service.student}`, this.appUtilityService.generateData(objects))
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }

  getAcademicSVs(academicSV: AcademicSupervisorRequest): Observable<AcademicSupervisorResponse[]> {
    let objects: ObjectData[] = [{ object: academicSV, objectName: 'request', objectFormat: 'JSON' }];

    return this.httpClient.post<Response>(`${intern_user_reactive_service.academicSVs}/filter`, this.appUtilityService.generateData(objects))
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      map((res: AcademicSupervisorResponse[]) => {
        return res.sort(this.appUtilityService.sortArrayOfObjectByProperty('ASC', 'academicSvName'));
      }),
      shareReplay()
    );
  }

  getAcademicSv(academicSvId: string): Observable<AcademicSupervisorResponse> {
    return this.httpClient.get<Response>(`${intern_user_reactive_service.academicSV}/${academicSvId}`)
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }

  updateAcademicSv(academicSV: AcademicSupervisorRequest): Observable<AcademicSupervisorResponse> {
    let objects: ObjectData[] = [{ object: academicSV, objectName: 'request', objectFormat: 'JSON' }];

    return this.httpClient.put<Response>(`${intern_user_reactive_service.academicSV}`, this.appUtilityService.generateData(objects))
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }

  getIndustrySVs(industrySV: IndustrySupervisorRequest): Observable<IndustrySupervisorResponse[]> {
    let objects: ObjectData[] = [{ object: industrySV, objectName: 'request', objectFormat: 'JSON' }];

    return this.httpClient.post<Response>(`${intern_user_reactive_service.industrySVs}/filter`, this.appUtilityService.generateData(objects))
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      map((res: IndustrySupervisorResponse[]) => {
        return res.sort(this.appUtilityService.sortArrayOfObjectByProperty('ASC', 'industrySvName'));
      }),
      shareReplay()
    );
  }

  getIndustrySv(industrySvId: string): Observable<IndustrySupervisorResponse> {
    return this.httpClient.get<Response>(`${intern_user_reactive_service.industrySV}/${industrySvId}`)
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }

  updateIndustrySv(industrySV: IndustrySupervisorRequest): Observable<IndustrySupervisorResponse> {
    let objects: ObjectData[] = [{ object: industrySV, objectName: 'request', objectFormat: 'JSON' }];

    return this.httpClient.put<Response>(`${intern_user_reactive_service.industrySV}`, this.appUtilityService.generateData(objects))
    .pipe(
      map(res => this.appUtilityService.isObjectNotEmpty(res.data) ? res.data['response'] : res.data),
      shareReplay()
    );
  }
  
  /**
   * ! handle http error
   * ? https://angular.io/guide/http-handle-request-errors
   */
}
