import { regCommas, regLineChanges } from "./regex"

const getIgnoringCommas = (str: string) => {
	return str.replace(regCommas, '，');
}

const getIgnoringLineChanges = (str: string) => {
	return str.replace(regLineChanges, ' ');
}

export default {
	getIgnoringCommas,
	getIgnoringLineChanges,
}