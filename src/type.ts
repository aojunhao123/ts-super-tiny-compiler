type Token = {
  type: string;
  value: string;
};

type ASTNodes = {
  type: string;
  value: string;
  params: ASTNodes[];
};

export type { Token };
