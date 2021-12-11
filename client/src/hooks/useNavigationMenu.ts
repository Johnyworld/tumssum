import { useState } from "preact/hooks";
import { useCallback } from "react";
import { IconType } from "types";


export interface NavigationMenuItem<S> {
	id: S;
	icon: IconType;
	text?: string;
	href?: string
}

export default <S>(menus: NavigationMenuItem<S>[], initialValue?: S) => {
	const [currentMenu, setCurrentMenu] = useState<S>(initialValue || menus[0].id);
	const handleChangeMenu = useCallback((newView: S) => setCurrentMenu(newView), []);
	return { menus, currentMenu, handleChangeMenu };
}