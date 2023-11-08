"use client"
import axios, { AxiosRequestConfig } from "axios"


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_APIURL,
})

type MakeRequest<T> = {
  error: any;
  data: T | null;
}

export async function makeRequest<T>(url:string, options:AxiosRequestConfig): Promise<MakeRequest<T>> {
  try {
    const res = await api<T>(url, options);
    return { error: null, data: res.data };
  } catch (err:any) {
    return { error:  err.response?.data?.msg || "Something Went Wronge Try Again Later", data: err.response?.data?.data };
  }
}