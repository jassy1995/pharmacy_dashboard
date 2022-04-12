export interface IRequest {
  address?: string;
  attachments?: null | string;
  created_at?: string;
  cred_plus_upfront?: string;
  picture: string | null;
  customer_id?: number;
  credit?: false;
  discount?: null;
  checkout?: number;
  upfront_paid?: number;
  source?: number;
  deleted?: number;
  payment_token: string;
  deleted_at?: null | string;
  email?: string;
  item_id: number;
  full_name?: string;
  gender?: null | string;
  generic_link?: null | string;
  id?: number;
  merchant_id?: number;
  itemPriceToBeDeleted?: string | number;
  monthly_amt?: null | string;
  no_of_months?: number;
  phone?: string;
  phone_no?: string;
  req_date?: string;
  req_status?: number;
  itemAboutToBeDeleted?: number;
  total_credit?: string;
  updated_at?: string;
  upfront_amt?: string;
  request_id?: number;
  pictureInView?: string;
  customer_data: true;
  requestSchedule?: Array<any>;
  card_exists?: boolean;
  card?: string;
  slug: string;
  offer: IOffer;
  creditclan_request_id?: string;
}

interface IOffer {
  amount: number;
  duration: number;
  first_repayment_date: string;
  id: number;
  lender: string;
  monthly_repayment: number;
  repayment_date: string;
  tenor_type: number;
  total_repayment: number;
  upfront: number;
  user: { request_id: number, user_id: string };
  request_id: number;
  user_id: string;
}
