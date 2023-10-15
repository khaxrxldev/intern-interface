import { CriteriaResponse } from "./CriteriaResponse";
import { QuestionResponse } from "./QuestionResponse";

export interface CriteriaQuestionsResponse {
  criteria?: CriteriaResponse,
  criteriaMark?: number,
  questions?: QuestionResponse[]
}