import { useContext } from "preact/hooks"
import { GlobalContext, StoresInterface } from "./provider";

export default (store: StoresInterface) => {
  const stores = useContext(GlobalContext);
  return stores[store];
}