export interface CompanyProps {
  Address?: string;
  Phone?: string;
  Email?: string;
  Instagram?: string;
  Telegram?: string;
  Whatsapp?: string;
  Comment?: string;
  latitude?: string | number;
  longitude?: string | number;
}

export interface companyInfoResponse {
  isPending: boolean;
  companyInfo: Partial<CompanyProps>;
}

export interface CompanyPropsResponse {
  message: string;
  company_info: Partial<CompanyProps>;
}

export interface AboutProps {
  Code?: string;
  Title: string;
  Comment?: string;
}

export interface AboutPropsResponse {
  message: string;
  result: AboutProps[];
}

export interface ContactKeyValues {
  title?: string;
  value?: string;
}
