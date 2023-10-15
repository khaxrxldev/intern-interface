import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intern_user_service } from 'src/assets/environments/environment.dev';
import { Response } from '../model/Response';
import { StudentRequest } from '../model/Request/StudentRequest';
import { SigninRequest } from '../model/Request/SigninRequest';
import { AcademicSupervisorRequest } from '../model/Request/AcademicSupervisorRequest';
import { IndustrySupervisorRequest } from '../model/Request/IndustrySupervisorRequest';

@Injectable({
  providedIn: 'root'
})
export class InternUserService {

  constructor(private httpClient: HttpClient) { }

  signin(signin: SigninRequest) {
    const postData = new FormData();

    postData.append('signinRequest', new Blob([JSON.stringify(signin)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_user_service.user}/signin`, postData);
  }

  filterAcademicSupervisors(academicSupervisor?: AcademicSupervisorRequest) {
    const postData = new FormData();

    postData.append('academicSupervisorRequest', new Blob([JSON.stringify(academicSupervisor)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_user_service.academicSupervisors}/filter`, postData);
  }

  retrieveAcademicSupervisor(academicSvId: string) {
    return this.httpClient.get<Response>(intern_user_service.academicSupervisor + `/${academicSvId}`);
  }

  insertAcademicSupervisor(academicSupervisor: AcademicSupervisorRequest) {
    const postData = new FormData();

    postData.append('academicSupervisorRequest', new Blob([JSON.stringify(academicSupervisor)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_user_service.academicSupervisor, postData);
  }

  updateAcademicSupervisor(academicSupervisor: AcademicSupervisorRequest) {
    const postData = new FormData();

    postData.append('academicSupervisorRequest', new Blob([JSON.stringify(academicSupervisor)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_user_service.academicSupervisor, postData);
  }

  deleteAcademicSupervisor(academicSvId: string) {
    return this.httpClient.delete<Response>(intern_user_service.academicSupervisor + `/${academicSvId}`);
  }

  filterIndustrySupervisors(industrySupervisor?: IndustrySupervisorRequest) {
    const postData = new FormData();

    postData.append('industrySupervisorRequest', new Blob([JSON.stringify(industrySupervisor)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_user_service.industrySupervisors}/filter`, postData);
  }

  retrieveIndustrySupervisorsChart() {
    return this.httpClient.get<Response>(`${intern_user_service.industrySupervisors}/chart`);
  }

  retrieveIndustrySupervisor(industrySvId: string) {
    return this.httpClient.get<Response>(intern_user_service.industrySupervisor + `/${industrySvId}`);
  }

  insertIndustrySupervisor(industrySupervisor: IndustrySupervisorRequest) {
    const postData = new FormData();

    postData.append('industrySupervisorRequest', new Blob([JSON.stringify(industrySupervisor)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_user_service.industrySupervisor, postData);
  }

  updateIndustrySupervisor(industrySupervisor: IndustrySupervisorRequest) {
    const postData = new FormData();

    postData.append('industrySupervisorRequest', new Blob([JSON.stringify(industrySupervisor)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_user_service.industrySupervisor, postData);
  }

  deleteIndustrySupervisor(industrySvId: string) {
    return this.httpClient.delete<Response>(intern_user_service.industrySupervisor + `/${industrySvId}`);
  }

  retrieveStudents() {
    return this.httpClient.get<Response>(intern_user_service.students);
  }

  filterStudents(student: StudentRequest) {
    const postData = new FormData();

    postData.append('studentRequest', new Blob([JSON.stringify(student)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_user_service.students}/filter`, postData);
  }

  retrieveStudentsChart() {
    return this.httpClient.get<Response>(`${intern_user_service.students}/chart`);
  }

  retrieveStudentByStudentMatricNum(studentMatricNum: string) {
    return this.httpClient.get<Response>(intern_user_service.student + `/${studentMatricNum}`);
  }

  insertStudent(student: StudentRequest, cvFile: File, mtFile: File, clFile: File, coFile: File, slFile: File) {
    const postData = new FormData();

    postData.append('studentRequest', new Blob([JSON.stringify(student)], {
      type: 'application/json',
    }));
    postData.append('cvFile', cvFile);
    postData.append('mtFile', mtFile);
    postData.append('clFile', clFile);
    postData.append('coFile', coFile);
    postData.append('slFile', slFile);

    return this.httpClient.post<Response>(intern_user_service.student, postData);
  }

  updateStudent(student: StudentRequest, cvFile: File, mtFile: File, clFile: File, coFile: File, slFile: File) {
    const postData = new FormData();

    postData.append('studentRequest', new Blob([JSON.stringify(student)], {
      type: 'application/json',
    }));
    postData.append('cvFile', cvFile);
    postData.append('mtFile', mtFile);
    postData.append('clFile', clFile);
    postData.append('coFile', coFile);
    postData.append('slFile', slFile);

    return this.httpClient.put<Response>(intern_user_service.student, postData);
  }

  deleteStudentByStudentMatricNum(studentMatricNum: string) {
    return this.httpClient.delete<Response>(intern_user_service.student + `/${studentMatricNum}`);
  }

  updateStudents(students: StudentRequest[]) {
    const postData = new FormData();

    postData.append('studentRequests', new Blob([JSON.stringify(students)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_user_service.students, postData);
  }
}
