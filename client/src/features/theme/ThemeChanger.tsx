import { h } from "preact";
import Button from "~components/elements/Button";
import { changeTheme } from "~features/mode/modeSlice";
import { useDispatch, useSelector } from "~utils/redux/hooks";


const ThemeChanger = () => {
  const theme = useSelector(state => state.mode.theme)
  const dispatch = useDispatch()
  return <Button onClick={() => dispatch(changeTheme())}>{theme}</Button>
}

export default ThemeChanger

