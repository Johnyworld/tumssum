import { JSX } from "preact";
import { StateUpdater, useState } from "preact/hooks";

const useInput = (defaultValue: string): [value: string, handleChange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void, setValue: StateUpdater<string>] => {
  const [ value, setValue ] = useState(defaultValue);

  const handleChange = ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setValue(currentTarget.value);
  }

  return [ value, handleChange, setValue ]
}

export default useInput;