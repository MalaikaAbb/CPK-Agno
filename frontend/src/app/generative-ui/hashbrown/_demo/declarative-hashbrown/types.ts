// Not from the doc page: the printed renderer imports this type but the page
// does not print the file. Kept as the Agno showcase has it.
export const SALES_STAGES = [
  "prospect",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
  "closed-lost",
] as const;

export type SalesStage = (typeof SALES_STAGES)[number];
