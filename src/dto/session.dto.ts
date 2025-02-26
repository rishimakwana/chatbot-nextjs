export interface AddSessionResponse {
  statusCode: number;
  detail: string;
  data: {
    created_at: string;
    updated_at: string;
    title: string;
    _id: number;
  };
}