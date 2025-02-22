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
    let breakEvenPoint =
      ((salary + totalFixedExpenses) * totalVariableExpenses) /
        (100 - totalVariableExpenses) +
      salary +
      totalFixedExpenses;
    breakEvenPoint = parseFloat(breakEvenPoint);
    return breakEvenPoint.toFixed(2);
  };

  const calculateServiceCost = (service) => {
    let total = 0;
    let hourlyCost = workValue[0].workValue;
    if (service.materials) {
      let serviceMaterials = service.materials.map(
        (material) => +material.value
      );
      let materialQuantity = service.materials.map(
        (material) => +material.quantityServices
      );
      console.log(materialQuantity);
      serviceMaterials.forEach(
        (material, index) => (total += material / materialQuantity[index])
      );
    }
    let serviceTime = +service.time / 60;
    total = total + serviceTime * hourlyCost;
    return total;
  };

  return { calculateExpenses, calculateBreakEvenPoint, calculateServiceCost };
};
