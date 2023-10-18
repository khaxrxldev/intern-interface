import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intern_common_service } from 'src/assets/environments/environment.dev';
import { Response } from '../model/Response';
import { CompanyRequest } from '../model/Request/CompanyRequest';
import { QuestionRequest } from '../model/Request/QuestionRequest';
import { SemesterRequest } from '../model/Request/SemesterRequest';

@Injectable({
  providedIn: 'root'
})
export class InternCommonService {

  constructor(private httpClient: HttpClient) { }

  retrieveCompanies() {
    return this.httpClient.get<Response>(intern_common_service.companies);
  }

  retrieveCompanyByCompanyId(companyId: string) {
    return this.httpClient.get<Response>(intern_common_service.company + `/${companyId}`);
  }

  insertCompany(company: CompanyRequest, brochureFile: File) {
    const postData = new FormData();

    postData.append('companyRequest', new Blob([JSON.stringify(company)], {
      type: 'application/json',
    }));
    postData.append('brochureFile', brochureFile);

    return this.httpClient.post<Response>(intern_common_service.company, postData);
  }

  updateCompany(company: CompanyRequest, brochureFile: File) {
    const postData = new FormData();

    postData.append('companyRequest', new Blob([JSON.stringify(company)], {
      type: 'application/json',
    }));
    postData.append('brochureFile', brochureFile);

    return this.httpClient.put<Response>(intern_common_service.company, postData);
  }

  deleteCompanyByCompanyId(companyId: string) {
    return this.httpClient.delete<Response>(intern_common_service.company + `/${companyId}`);
  }

  retrieveQuestions() {
    return this.httpClient.get<Response>(intern_common_service.questions);
  }

  filterQuestions(question: QuestionRequest) {
    const postData = new FormData();

    postData.append('questionRequest', new Blob([JSON.stringify(question)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_common_service.questions}/filter`, postData);
  }

  retrieveQuestionByQuestionId(questionId: string) {
    return this.httpClient.get<Response>(intern_common_service.question + `/${questionId}`);
  }

  insertQuestion(question: QuestionRequest) {
    const postData = new FormData();

    postData.append('questionRequest', new Blob([JSON.stringify(question)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_common_service.question, postData);
  }

  updateQuestion(question: QuestionRequest) {
    const postData = new FormData();

    postData.append('questionRequest', new Blob([JSON.stringify(question)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_common_service.question, postData);
  }

  deleteQuestionByQuestionId(questionId: string) {
    return this.httpClient.delete<Response>(intern_common_service.question + `/${questionId}`);
  }

  retrieveSemesters() {
    return this.httpClient.get<Response>(intern_common_service.semesters);
  }

  filterSemesters(semester: SemesterRequest) {
    const postData = new FormData();

    postData.append('semesterRequest', new Blob([JSON.stringify(semester)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_common_service.semesters}/filter`, postData);
  }

  retrieveSemesterBySemesterId(semesterId: string) {
    return this.httpClient.get<Response>(intern_common_service.semester + `/${semesterId}`);
  }

  insertSemester(semester: SemesterRequest) {
    const postData = new FormData();

    postData.append('semesterRequest', new Blob([JSON.stringify(semester)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_common_service.semester, postData);
  }

  updateSemester(semester: SemesterRequest) {
    const postData = new FormData();

    postData.append('semesterRequest', new Blob([JSON.stringify(semester)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_common_service.semester, postData);
  }

  updateSemesters(semesters: SemesterRequest[]) {
    const postData = new FormData();

    postData.append('semesterRequests', new Blob([JSON.stringify(semesters)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_common_service.semesters, postData);
  }

  deleteSemesterBySemesterId(semesterId: string) {
    return this.httpClient.delete<Response>(intern_common_service.semester + `/${semesterId}`);
  }

  insertStudentSemesters(semesterIds: string[], studentMatricNum: string) {
    const postData = new FormData();

    postData.append('semesterIdList', new Blob([JSON.stringify(semesterIds)], {
      type: 'application/json',
    }));
    postData.append('studentMatricNum', studentMatricNum);

    return this.httpClient.post<Response>(intern_common_service.studentsSemesters, postData);
  }
}
