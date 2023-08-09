import { ResponseTodo } from '../types/Response'
type Method = 'GET' | 'DELETE'| 'POST' | 'PUT' 

const setGet = async (url?: string) => {
  return await setFetch(url ?? '', 'GET')
}

const setDelete = async (url?: string) => {
  return await setFetch(url ?? '', 'DELETE')
}

const setPost = async <T>(body: T, url?: string) => {
  return await setFetch(url ?? '', 'POST', body)
}

const setUpdate = async <T>(body: T, url?: string,) => {
  return await setFetch(url ?? '', 'PUT', body)
}

const setFetch = async <T>(url: string, method: Method, body?: T) => {
  const result = await fetch(String(import.meta.env.VITE_API_TODO) + url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data: ResponseTodo = await result.json()
  return data
}


export default {
  setGet,
  setDelete,
  setPost,
  setUpdate,
}