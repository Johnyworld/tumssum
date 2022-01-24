import { useLocation } from "react-router-dom";

/**
 * useage) const id = useQuery('id');
 */
export default function useQuery (key: string) {
  return new URLSearchParams(useLocation().search).get(key);
}
