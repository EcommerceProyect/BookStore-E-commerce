import useSWR from 'swr';

// Configuración global de SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  dedupingInterval: 3000,
  // Otras configuraciones de SWR según tus necesidades
};

export const useGlobalSWR = (key, options) => useSWR(key, swrConfig, options);