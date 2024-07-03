import { FetchMethod, FetchResponse } from '../types/Fetch'
const API_TODO = String(import.meta.env.VITE_API_TODO)

export const fetchTodo = async <T = FetchResponse>(url: string, method: FetchMethod, body?: object): Promise<T> => {
  try {
    const result = await fetch(API_TODO + url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await result.json() as T
  } catch (error) {
    return {
      status: false,
    } as T
  }
}