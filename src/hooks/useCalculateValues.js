import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";

export const useCalculateValues = () => {
  const { user, workValue, fixedExpenses, variableExpenses, services } =
    useAuthValue();

  const calculateExpenses = (expenses) => {
    let total = 0;
    let expensesValues = expenses.map((expense) => +expense.value);
    expensesValues.forEach((expense) => (total += +expense));
    return total;
  };

  const calculateBreakEvenPoint = (salary) => {
    let totalFixedExpenses = calculateExpenses(fixedExpenses);
    let totalVariableExpenses = calculateExpenses(variableExpenses);
    const breakEvenPoint =
      ((salary + totalFixedExpenses) * totalVariableExpenses) /
        (100 - totalVariableExpenses) +
      salary +
      totalFixedExpenses;
    return breakEvenPoint.toFixed(2);
  };

  return { calculateExpenses, calculateBreakEvenPoint };
};
