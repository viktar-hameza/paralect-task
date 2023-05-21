export interface ErrorResponse {
  error: {
    code: number;
    message: string;
    error: string;
  };
}

export type CataloguesResponse = Array<Catalogue>;

export interface Catalogue {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
  reg_user_resumes_count: number;
}

export interface SearchResponse {
  objects: Vacancy[];
  total: number;
  more: boolean;
  subscription_id: number;
  subscription_active: boolean;
}

export interface Vacancy {
  canEdit: boolean;
  is_closed: boolean;
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: null | string;
  profession: string;
  work: null;
  compensation: null;
  candidat: string;
  metro: any[];
  currency: string;
  vacancyRichText: string;
  covid_vaccination_requirement: Agency;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  is_archive: boolean;
  is_storage: boolean;
  type_of_work: Agency;
  place_of_work: Agency;
  education: Agency;
  experience: Agency;
  maritalstatus: Agency;
  children: Agency;
  client: Client;
  languages: any[];
  driving_licence: any[];
  catalogues: Catalogue[];
  agency: Agency;
  town: Town;
  already_sent_on_vacancy: boolean;
  rejected: boolean;
  response_info: any[];
  phone: string;
  phones: Phone[];
  fax: null;
  faxes: null;
  client_logo: null | string;
  highlight: boolean;
  age_from: number;
  age_to: number;
  gender: Agency;
  firm_name: string;
  firm_activity: string;
  link: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Agency {
  id: number;
  title: string;
}

export interface Catalogue {
  id: number;
  title: string;
  key: number;
  positions?: Catalogue[];
}

export interface Client {
  id: number;
  title: string;
  link: string;
  industry: any[];
  description: string;
  vacancy_count: number;
  staff_count: string;
  client_logo: null | string;
  address: null | string;
  addresses: Address[];
  url: null | string;
  short_reg: boolean;
  is_blocked: boolean;
  registered_date: number;
  town: Town;
}

export interface Address {
  addressString: string;
  latitude: number;
  longitude: number;
  phones: any[];
}

export interface Town {
  id: number;
  title: string;
  declension: string;
  hasMetro: boolean;
  genitive: string;
}

export interface Phone {
  number: string;
  additionalNumber: null;
}

export interface QueryOptions<TQueryFnData> {
  staleTime?: number;
  enabled?: boolean;
  keepPreviousData?: boolean;
  initialData: () => TQueryFnData | undefined;
}

export interface SearchParams {
  count?: number;
  page?: number;
  ids?: Array<number>;
  keyword?: string;
  catalogues?: string;
  payment_from?: number;
  payment_to?: number;
  published?: number;
  currency?: string;
  no_agreement?: number;
}
