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
    .reduce((acc, transaction) => acc + transaction.amount, 0)
);

console.log("====Doordash Expense====");
console.log("frequency\tcost");
console.log(
  `annually\t${total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`
);
console.log(
  `monthly\t\t${(total / 12).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`
);
