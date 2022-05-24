import { transactions } from "./transactions";

const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1);
const endDate = new Date();

const total = Math.abs(
  transactions
    .filter(
      (transaction) =>
        transaction.date > startDate &&
        transaction.date <= endDate &&
        transaction.description?.toLowerCase().includes("doordash")
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0)
);

console.log("====Doordash Expense====");
console.log("Frequency\tCost");
console.log(
  `Annually\t${total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`
);
console.log(
  `Monthly\t\t${(total / 12).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`
);
