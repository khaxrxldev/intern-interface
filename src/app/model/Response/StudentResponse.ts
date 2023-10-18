import { AcademicSupervisorResponse } from "./AcademicSupervisorResponse";
import { IndustrySupervisorResponse } from "./IndustrySupervisorResponse";
import { StudentSemesterResponse } from "./StudentSemesterResponse";

export interface StudentResponse {
  studentMatricNum?: string,
  studentName?: string,
  studentAddress?: string,
  studentEmail?: string,
  studentPhone?: string,
  studentPassword?: string,
  studentCampus?: string,
  studentCourse?: string,
  studentClass?: string,
  studentProject?: string,
  studentStatus?: string,
  studentCV?: string,
  studentCVFileName?: string,
  studentMiniTranscript?: string,
  studentMiniTranscriptFileName?: string,
  studentCoverLetter?: string,
  studentCoverLetterFileName?: string,
  studentCourseOutline?: string,
  studentCourseOutlineFileName?: string,
  studentSL?: string,
  studentSLFileName?: string,
  industrySvId?: string,
  industrySv?: IndustrySupervisorResponse,
  academicSvId?: string,
  academicSv?: AcademicSupervisorResponse,
  coordinatorId?: string,
  evaluationIds?: string[],
  studentSemesters?: StudentSemesterResponse[]
}