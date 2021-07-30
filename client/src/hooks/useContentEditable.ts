import { StateUpdater, useState } from "preact/hooks";

const useContentEditable = (defaultValue: string): [value: string, handleInput: (value: string) => void, setValue: StateUpdater<string>] => {
	const [value, setValue] = useState(defaultValue);

	const handleInput = (value: string) => {
		setValue(value);
	}

  return [ value, handleInput, setValue ];
}

export default useContentEditable;