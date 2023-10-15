export interface StudentEvaluationRequest {
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
  studentMatricNum?: string,
  academicSvId?: string,
  industrySvId?: string,
  userLoginType?: string
}