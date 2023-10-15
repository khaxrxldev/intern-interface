import { CompanyResponse } from "./CompanyResponse";

export interface IndustrySupervisorResponse {
  industrySvId?: string,
  industrySvName?: string,
  industrySvPhone?: string,
  industrySvEmail?: string,
  industrySvPassword?: string,
  industrySvGender?: string,
  industrySvPosition?: string,
	companyId?: string,
  company?: CompanyResponse
}