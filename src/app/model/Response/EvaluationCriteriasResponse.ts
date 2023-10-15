import { CriteriaQuestionsResponse } from "./CriteriaQuestionsResponse";
import { EvaluationResponse } from "./EvaluationResponse";

export interface EvaluationCriteriasResponse {
  evaluation?: EvaluationResponse,
  criterias?: CriteriaQuestionsResponse[]
}