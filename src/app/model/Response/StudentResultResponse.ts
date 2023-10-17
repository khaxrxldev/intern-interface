import { StudentResponse } from "./StudentResponse";

export interface StudentResultResponse {
  student?: StudentResponse,
  studentEvaluationsStatus?: string,
  subject1TotalMark?: number,
  subject1Grade?: string,
  subject1Pointer?: string,
  subject2TotalMark?: number,
  subject2Grade?: string,
  subject2Pointer?: string
}