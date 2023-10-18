import { SemesterResponse } from "./SemesterResponse";

export interface StudentSemesterResponse {
  studentSemesterId?: string,
  studentMatricNum?: string,
  semesterId?: string,
  semester?: SemesterResponse
}