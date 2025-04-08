import { useEffect, useState } from "react";

export  function useFetch<T>(url: string){
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        if(!res.ok){  
          setError("Failed to fetch products");
        }
        const json = await res.json();
        setData(json);
        
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }      }finally{
        setIsLoading(false);
      }
    }
    loadData()
  }, [url])


  return {data, isLoading, error}
}
