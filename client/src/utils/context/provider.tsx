import { h, createContext, FunctionalComponent, Context } from 'preact';
import modeStore, { ModeStore } from '../../features/mode/modeStore';

export interface GlobalContextInterface {
  mode: ModeStore;
}

export type StoresInterface = keyof GlobalContextInterface;

export const GlobalContext: Context<GlobalContextInterface> = createContext({} as GlobalContextInterface);

const Provider: FunctionalComponent = ({ children }) => {

  const mode = modeStore();

  const stores = {
    mode,
  };

  return (
    <GlobalContext.Provider value={stores}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider;
