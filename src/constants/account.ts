const accountType = ["current", "credit", "loan", "mortgage"] as const;

const accountTypeLabels: {
  label: string;
  value: (typeof accountType)[number];
}[] = [
  {
    label: "Current/savings account",
    value: accountType[0],
  },
  {
    label: "Credit",
    value: accountType[1],
  },
  {
    label: "Loan",
    value: accountType[2],
  },
  {
    label: "Mortgage",
    value: accountType[3],
  },
];

export { accountType, accountTypeLabels };

const MAXIMUM_DOB = new Date();
MAXIMUM_DOB.setFullYear(MAXIMUM_DOB.getFullYear() - 20, 11, 31);

export { MAXIMUM_DOB };
