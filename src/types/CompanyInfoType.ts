export interface CompanyInfoType {
  Address: string;
  Phone: string;
  Email: string;
  Instagram: string;
  Telegram: string;
  Whatsapp: string;
  Comment: string;
}

export interface CompanyInfoResponse {
  message: string;
  company_info: Partial<CompanyInfoType>;
}