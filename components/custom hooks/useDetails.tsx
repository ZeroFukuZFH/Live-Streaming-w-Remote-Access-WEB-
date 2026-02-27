import { useState } from "react";
import { useFetch } from "./useFetch";

export interface ImagesConfig {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

export interface DetailProps {
  images: ImagesConfig;
  change_keys: string[];
}

export function useDetails() {
  const [details, setDetails] = useState<DetailProps | null>(null);
  const url = "/configuration"
  useFetch<DetailProps | null>(url, setDetails)
  return details;
}
  