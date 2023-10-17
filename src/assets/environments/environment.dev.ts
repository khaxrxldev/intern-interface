const domain: string = 'http://localhost:';

let intern_common_service_port: number = 8081;
export const intern_common_service = {
  production: false,
  company: `${domain}${intern_common_service_port}/common/company`,
  companies: `${domain}${intern_common_service_port}/common/companies`,
  question: `${domain}${intern_common_service_port}/common/question`,
  questions: `${domain}${intern_common_service_port}/common/questions`,
  semester: `${domain}${intern_common_service_port}/common/semester`,
  semesters: `${domain}${intern_common_service_port}/common/semesters`
}

export const intern_common_reactive_service = {
  production: false,
  company: `${domain}${intern_common_service_port}/common/reactive/company`,
  companies: `${domain}${intern_common_service_port}/common/reactive/companies`
}

let intern_core_service_port: number = 8082;
export const intern_core_service = {
  production: false,
  application: `${domain}${intern_core_service_port}/core/application`,
  applications: `${domain}${intern_core_service_port}/core/applications`,
  criteria: `${domain}${intern_core_service_port}/core/criteria`,
  criterias: `${domain}${intern_core_service_port}/core/criterias`,
  evaluation: `${domain}${intern_core_service_port}/core/evaluation`,
  evaluations: `${domain}${intern_core_service_port}/core/evaluations`,
  evaluationQuestion: `${domain}${intern_core_service_port}/core/evaluation/question`,
  evaluationsQuestions: `${domain}${intern_core_service_port}/core/evaluations/questions`,
  result: `${domain}${intern_core_service_port}/core/result`,
  results: `${domain}${intern_core_service_port}/core/results`,
  studentEvaluation: `${domain}${intern_core_service_port}/core/student/evaluation`,
  studentsEvaluations: `${domain}${intern_core_service_port}/core/students/evaluations`
}

let intern_user_service_port: number = 8083;
export const intern_user_service = {
  production: false,
  academicSupervisor: `${domain}${intern_user_service_port}/user/academic/supervisor`,
  academicSupervisors: `${domain}${intern_user_service_port}/user/academic/supervisors`,
  industrySupervisor: `${domain}${intern_user_service_port}/user/industry/supervisor`,
  industrySupervisors: `${domain}${intern_user_service_port}/user/industry/supervisors`,
  user: `${domain}${intern_user_service_port}/user`,
  supervisor: `${domain}${intern_user_service_port}/user/supervisor`,
  supervisors: `${domain}${intern_user_service_port}/user/supervisors`,
  student: `${domain}${intern_user_service_port}/user/student`,
  students: `${domain}${intern_user_service_port}/user/students`
}

export const intern_user_reactive_service = {
  production: false,
  academicSV: `${domain}${intern_user_service_port}/user/reactive/academic/supervisor`,
  academicSVs: `${domain}${intern_user_service_port}/user/reactive/academic/supervisors`,
  industrySV: `${domain}${intern_user_service_port}/user/reactive/industry/supervisor`,
  industrySVs: `${domain}${intern_user_service_port}/user/reactive/industry/supervisors`,
  student: `${domain}${intern_user_service_port}/user/reactive/student`,
  students: `${domain}${intern_user_service_port}/user/reactive/students`
}