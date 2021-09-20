import { Budget } from "types"
import numberUtils from "./numberUtils";


const findBudgetWithDate: (budgets: Budget[], currentDate: string, count: number) => Budget | null = (budgets, currentDate, count) => {
	const exists = budgets.find(budget => budget.date === currentDate);
	if (exists) return exists;
	if (count <= 0) return null;
	else {
		const split = currentDate.split('-');
		const Y = +split[0];
		const M = +split[1];
		const date = `${M === 1 ? Y-1 : Y}-${M === 1 ? 12 : numberUtils.getZeroNumber(M-1)}`;
		return findBudgetWithDate(budgets, date, count-1);
	}
}


const getBudgetOfCategory: (category_id: number, budgets: Budget[], currentDate: string) => number | undefined = (category_id, budgets, currentDate) => {
	const filtered = budgets.filter(budget => budget.category === category_id);
	if (filtered.length) return findBudgetWithDate(filtered, currentDate, 12)?.budget;
	else return undefined;
}


export default {
	findBudgetWithDate,
	getBudgetOfCategory,
}