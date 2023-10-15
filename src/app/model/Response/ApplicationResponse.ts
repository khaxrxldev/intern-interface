import { CompanyResponse } from "./CompanyResponse"
import { StudentResponse } from "./StudentResponse"

export interface ApplicationResponse {
  applicationId?: string,
  applicationDate?: string,
  applicationCompStatus?: string,
  applicationStudStatus?: string,
  studentMatricNum?: string,
  student?: StudentResponse,
  companyId?: string,
  company?: CompanyResponse
}