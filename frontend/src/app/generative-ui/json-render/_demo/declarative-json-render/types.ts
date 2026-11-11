// Not from the doc page: the printed renderer imports this type but the page
// does not print the file. Kept as the Agno showcase has it.
export interface JsonRenderSpec {
  root: string;
  elements: Record<
    string,
    { type: string; props: Record<string, unknown>; children?: string[] }
  >;
}
