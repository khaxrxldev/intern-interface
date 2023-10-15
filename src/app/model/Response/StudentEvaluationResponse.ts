import { EvaluationResponse } from "./EvaluationResponse";

export interface StudentEvaluationResponse {
  studentEvaluationId?: string,
  studentEvaluationDate?: string,
  studentEvaluationStartDate?: string,
  studentEvaluationEndDate?: string,
  studentEvaluationStatus?: string,
  studentEvaluationAttach?: string,
  studentEvaluationAttachFileName?: string,
  studentEvaluationAttachDate?: string,
  studentEvaluationComment?: string,
  studentEvaluationTotalScore?: number,
  evaluationId?: string,
  evaluation?: EvaluationResponse
  studentMatricNum?: string,
  academicSvId?: string,
  industrySvId?: string
}