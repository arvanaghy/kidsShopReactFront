export interface AboutInfoType {
  Code: string;
  Title: string;
  Comment?: string;
}

export interface AboutInfoResponse {
  message: string;
  result: AboutInfoType[];
}
