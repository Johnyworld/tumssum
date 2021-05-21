import { h, createContext, FunctionalComponent, Context } from 'preact';
import createModeStore, { ModeStore } from '../../features/mode/createModeStore';

export interface GlobalContextInterface {
  mode: ModeStore;
}

export type StoresInterface = keyof GlobalContextInterface;

export const GlobalContext: Context<GlobalContextInterface> = createContext({} as GlobalContextInterface);

const Provider: FunctionalComponent = ({ children }) => {

  const mode = createModeStore();

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
