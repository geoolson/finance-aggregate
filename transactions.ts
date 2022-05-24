import fs from "fs";
import "dotenv/config";

export type Transaction = {
  id: string;
  date: Date;
  effectiveDate: Date;
  transactionType: string;
  amount: number;
  checkNum: string;
  refNum: number;
  description: string;
  category: string;
  type: string;
  balance: number;
  memo: string;
  extendedDescription: string;
};

export const [header, transactions]: [string[], Transaction[]] = (() => {
  const file = fs.readFileSync(process.env.FILE_NAME as string, { encoding: "utf-8" });
  const [header, ...records] = file.split("\r\n");
  return [
    header.split(","),
    records.map((col) => {
      const [
        id,
        date,
        effectiveDate,
        transactionType,
        amount,
        checkNum,
        refNum,
        description,
        category,
        type,
        balance,
        memo,
        extendedDescription,
      ] = col.split('","');
      return {
        id,
        date: new Date(date),
        effectiveDate: new Date(effectiveDate),
        transactionType,
        amount: parseFloat(amount),
        checkNum,
        refNum: parseInt(refNum),
        description,
        category,
        type,
        balance: parseFloat(balance),
        memo,
        extendedDescription: extendedDescription?.slice(0, -1) ?? "",
      };
    }),
  ];
})();
