import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { intern_core_service } from 'src/assets/environments/environment.dev';
import { EvaluationRequest } from '../model/Request/EvaluationRequest';
import { Response } from '../model/Response';
import { ApplicationRequest } from '../model/Request/ApplicationRequest';
import { StudentEvaluationRequest } from '../model/Request/StudentEvaluationRequest';
import { CriteriaRequest } from '../model/Request/CriteriaRequest';
import { ResultRequest } from '../model/Request/ResultRequest';
import { SemesterRequest } from '../model/Request/SemesterRequest';
import { StudentResultRequest } from '../model/Request/StudentResultRequest';

@Injectable({
  providedIn: 'root'
})
export class InternCoreService {

  constructor(private httpClient: HttpClient) { }

  retrieveEvaluations() {
    return this.httpClient.get<Response>(intern_core_service.evaluations);
  }

  filterEvaluations(evaluation: EvaluationRequest) {
    const postData = new FormData();

    postData.append('evaluationRequest', new Blob([JSON.stringify(evaluation)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_core_service.evaluations}/filter`, postData);
  }

  retrieveEvaluationByevaluationId(evaluationId: string) {
    return this.httpClient.get<Response>(intern_core_service.evaluation + `/${evaluationId}`);
  }

  retrieveCompleteEvaluation(evaluationId: string, studentEvaluationId: string) {
    return this.httpClient.get<Response>(intern_core_service.evaluation + `/complete/${evaluationId}/${studentEvaluationId}`);
  }

  insertEvaluation(evaluation: EvaluationRequest) {
    const postData = new FormData();

    postData.append('evaluationRequest', new Blob([JSON.stringify(evaluation)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_core_service.evaluation, postData);
  }

  updateEvaluation(evaluation: EvaluationRequest) {
    const postData = new FormData();

    postData.append('evaluationRequest', new Blob([JSON.stringify(evaluation)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_core_service.evaluation, postData);
  }

  deleteEvaluationByEvaluationId(evaluationId: string) {
    return this.httpClient.delete<Response>(intern_core_service.evaluation + `/${evaluationId}`);
  }

  retrieveApplications() {
    return this.httpClient.get<Response>(intern_core_service.applications);
  }

  filterApplications(application: ApplicationRequest) {
    const postData = new FormData();

    postData.append('applicationRequest', new Blob([JSON.stringify(application)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_core_service.applications}/filter`, postData);
  }

  retrieveApplicationByApplyStatus(applyStatus: boolean, studentMatricNumber: string) {
    return this.httpClient.get<Response>(intern_core_service.application + `/${applyStatus}/${studentMatricNumber}`);
  }

  retrieveApplicationByApplicationId(applicationId: string) {
    return this.httpClient.get<Response>(intern_core_service.application + `/${applicationId}`);
  }

  insertApplication(application: ApplicationRequest) {
    const postData = new FormData();

    postData.append('applicationRequest', new Blob([JSON.stringify(application)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_core_service.application, postData);
  }

  updateApplication(application: ApplicationRequest) {
    const postData = new FormData();

    postData.append('applicationRequest', new Blob([JSON.stringify(application)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_core_service.application, postData);
  }

  deleteApplicationByApplicationId(applicationId: string) {
    return this.httpClient.delete<Response>(intern_core_service.application + `/${applicationId}`);
  }

  retrieveStudentResults() {
    return this.httpClient.get<Response>(`${intern_core_service.studentsEvaluations}/results`);
  }

  printStudentResult(studentMatricNum: string, evaluationId: string, studentEvaluationId: string) {
    return this.httpClient.get<Blob>(`${intern_core_service.studentEvaluation}/result/pdf/${studentMatricNum}/${evaluationId}/${studentEvaluationId}`, {
      observe: 'response',
      responseType: 'blob' as 'json',
    });
  }

  printStudentResults(studentResultRequest: StudentResultRequest) {
    const postData = new FormData();

    postData.append('studentResultRequest', new Blob([JSON.stringify(studentResultRequest)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Blob>(`${intern_core_service.studentsEvaluations}/results/pdf`, postData, {
      observe: 'response',
      responseType: 'blob' as 'json',
    });
  }

  filterStudentEvaluations(studentEvaluation: StudentEvaluationRequest) {
    const postData = new FormData();

    postData.append('studentEvaluationRequest', new Blob([JSON.stringify(studentEvaluation)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_core_service.studentsEvaluations}/filter`, postData);
  }

  insertStudentEvaluations(semesters: SemesterRequest[], studentMatricNum: string) {
    const postData = new FormData();

    postData.append('semesters', new Blob([JSON.stringify(semesters)], {
      type: 'application/json',
    }));
    postData.append('studentMatricNum', studentMatricNum);

    return this.httpClient.post<Response>(intern_core_service.studentsEvaluations, postData);
  }

  insertStudentEvaluation(studentEvaluation: StudentEvaluationRequest, attachFile: File) {
    const postData = new FormData();

    postData.append('studentEvaluationRequest', new Blob([JSON.stringify(studentEvaluation)], {
      type: 'application/json',
    }));
    postData.append('attachFile', attachFile);

    return this.httpClient.post<Response>(intern_core_service.studentEvaluation, postData);
  }

  updateStudentEvaluation(studentEvaluation: StudentEvaluationRequest, attachFile: File) {
    const postData = new FormData();

    postData.append('studentEvaluationRequest', new Blob([JSON.stringify(studentEvaluation)], {
      type: 'application/json',
    }));
    postData.append('attachFile', attachFile);

    return this.httpClient.put<Response>(intern_core_service.studentEvaluation, postData);
  }

  deleteStudentEvaluation(studentEvaluation: string) {
    return this.httpClient.delete<Response>(intern_core_service.studentEvaluation + `/${studentEvaluation}`);
  }

  updateStudentEvaluations(studentMatricNum: string, evaluationIds: string[]) {
    const postData = new FormData();

    postData.append('studentMatricNum', studentMatricNum);
    postData.append('evaluationIds', new Blob([JSON.stringify(evaluationIds)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_core_service.studentsEvaluations, postData);
  }

  retrieveCriterias() {
    return this.httpClient.get<Response>(intern_core_service.criterias);
  }

  filterCriterias(criteria: CriteriaRequest) {
    const postData = new FormData();

    postData.append('criteriaRequest', new Blob([JSON.stringify(criteria)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(`${intern_core_service.criterias}/filter`, postData);
  }

  retrieveCriteriaByCriteriaId(criteriaId: string) {
    return this.httpClient.get<Response>(intern_core_service.criteria + `/${criteriaId}`);
  }

  insertCriteria(criteria: CriteriaRequest) {
    const postData = new FormData();

    postData.append('criteriaRequest', new Blob([JSON.stringify(criteria)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_core_service.criteria, postData);
  }

  updateCriteria(criteria: CriteriaRequest) {
    const postData = new FormData();

    postData.append('criteriaRequest', new Blob([JSON.stringify(criteria)], {
      type: 'application/json',
    }));

    return this.httpClient.put<Response>(intern_core_service.criteria, postData);
  }

  deleteCriteriaByCriteriaId(criteriaId: string) {
    return this.httpClient.delete<Response>(intern_core_service.criteria + `/${criteriaId}`);
  }

  insertResults(results: ResultRequest[]) {
    const postData = new FormData();

    postData.append('resultRequests', new Blob([JSON.stringify(results)], {
      type: 'application/json',
    }));

    return this.httpClient.post<Response>(intern_core_service.results, postData);
  }

  retrieveEvaluationsStatus(userType: string, userId: string) {
    return this.httpClient.get<Response>(intern_core_service.evaluations + `/${userType}/${userId}`);
  }
}
