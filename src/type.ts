type Token = {
  type: string;
  value: string;
};

interface ASTNodeBase {
  type: string;
}

interface Program extends ASTNodeBase {
  type: "Program";
  body: ASTNode[];
}

interface NumberLiteral extends ASTNodeBase {
  type: "NumberLiteral";
  value: string;
}

interface StringLiteral extends ASTNodeBase {
  type: "StringLiteral";
  value: string;
}

interface CallExpression extends ASTNodeBase {
  type: "CallExpression";
  name: string;
  params: ASTNode[];
}

type ASTNode = Program | NumberLiteral | StringLiteral | CallExpression;

export type {
  Token,
  ASTNode,
  Program,
  NumberLiteral,
  StringLiteral,
  CallExpression,
};
