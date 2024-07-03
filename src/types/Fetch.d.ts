export type FetchMethod = 'GET' | 'DELETE'| 'POST' | 'PUT'

export interface FetchResponse {
  status: boolean
}

export interface FetchResponseWithData<T> extends FetchResponse {
  data: T
}

