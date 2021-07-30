import { JSX } from "preact";
import { StateUpdater, useState } from "preact/hooks";

const useContentEditable = (defaultValue: string): [value: string, handleInput:JSX.GenericEventHandler<HTMLDivElement>, setValue: StateUpdater<string>] => {
	const [value, setValue] = useState(defaultValue);

	const handleInput:JSX.GenericEventHandler<HTMLDivElement> = (e) => {
		setValue(e.currentTarget.innerText);
	}

  return [ value, handleInput, setValue ];
}

export default useContentEditable;