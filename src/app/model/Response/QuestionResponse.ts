import { ResultResponse } from "./ResultResponse"

export interface QuestionResponse {
  questionId?: string,
  questionNumber?: string,
  questionDesc?: string,
  questionCategoryCode?: string,
  questionCategoryDesc?: string,
  questionWeightage?: number
  questionTotalMark?: number
  questionTotalMarks?: number[]
  criteriaId?: string
  questionResult?: ResultResponse
}