export interface QuestionRequest {
  questionId?: string,
  questionNumber?: string,
  questionDesc?: string,
  questionCategoryCode?: string,
  questionCategoryDesc?: string,
  questionWeightage?: number
  questionTotalMark?: number
  criteriaId?: string
}