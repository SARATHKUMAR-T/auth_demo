import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchCall(endPath: string, method: string, body?: any, headers?: any) {
  const options = {
    method,
    headers: headers || { 'Content-Type': 'application/json;charset=utf-8' },
    body: body && JSON.stringify(body)
  }
  const response = await fetch(`${process.env.BACKEND_URL}${endPath}`, options)
  return await response.json()
}

