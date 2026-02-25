import { useEffect, useState } from "react";
import { options } from "./data";

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
  useEffect(() => {
    const getDetails = async () => {
      try {
        const tmdbDetails = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/configuration", options).then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        });
        setDetails(tmdbDetails);
      } catch (err) {
        console.error(err);
      }
    };

    getDetails();
  }, []);
  return details;
}
  