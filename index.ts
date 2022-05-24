import fs from "fs";
import { transactions, Transaction } from "./transactions";

const DUPLICATE_COUNT = 6;
const MOST_RECENT_TRANSACTION = new Date("02/01/2022"); // at least one duplicate transaction is from this date or later
const OLDEST_TRANSACTION = new Date("01/01/2019");

const duplicateAmounts = transactions.reduce((acc: Record<string, Transaction[]>, record) => {
  if (acc[record.amount]) acc[record.amount].push(record);
  else acc[record.amount] = [record];
  return acc;
}, {});

const entries = Object.entries(duplicateAmounts).filter(
  ([amount, records]) =>
    records.length > DUPLICATE_COUNT &&
    records.some((transaction) => transaction.date > MOST_RECENT_TRANSACTION)
);

const duplicateInfo = entries.map(([amount, records]) => ({
  amount,
  count: records.length,
  lastTransaction: records.reduce(
    (acc, transaction) => (acc.date > transaction.date ? acc : transaction),
    records[0]
  ),
  descriptions: Array.from(new Set(records.map((record) => record.description))),
}));

console.log(
  `${entries.length} duplicate transaction amounts where there were more than ${DUPLICATE_COUNT} duplicates`
);

fs.writeFileSync(
  "output.json",
  JSON.stringify(
    {
      count: entries.length,
      duplicateInfo,
    },
    undefined,
    2
  )
);
