import React from 'react';
import { useDispatch, useSelector } from './hooks';
import { changeTheme } from './stores/modeSlice';

const App: React.FC = () => {

  const theme = useSelector(state => state.mode.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(changeTheme());
  }

  return (
    <div className="App">
      <h1>{theme}</h1>
      <button onClick={handleChangeTheme}>changeTheme</button>
    </div>
  );
}

export default App;
