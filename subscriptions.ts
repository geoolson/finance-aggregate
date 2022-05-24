import fs from "fs";

type Subscription = {
  name: string;
  cost: number;
  frequency: "monthly" | "annual";
};

const subscriptions: Subscription[] = fs
  .readFileSync("subscriptions.csv", { encoding: "utf-8" })
  .split("\r\n")
  .slice(1, -1)
  .map((record) => {
    const [name, cost, frequency] = record.split('","');
    return {
      name: name?.slice(1),
      frequency: frequency?.slice(0, -1) as "monthly" | "annual",
      cost: parseFloat(cost),
    };
  });

const annualCost = subscriptions.reduce((sum, sub) => {
  switch (sub.frequency) {
    case "monthly":
      return sum + Math.abs(sub.cost) * 12;
    case "annual":
      return sum + Math.abs(sub.cost);
  }
}, 0);

console.log("===Subscription Services===");
console.log("Frequency\tCost");
console.log(
  `Monthly\t\t${(annualCost / 12).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`
);
console.log(
  `Annually\t${annualCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}`
);
