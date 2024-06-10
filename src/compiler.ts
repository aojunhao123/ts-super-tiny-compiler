import type {
  Token,
  ASTNode,
  Program,
  NumberLiteral,
  StringLiteral,
  CallExpression,
} from "./type";

/**
 * 分词器
 * @description 将源代码字符串分割成token
 * @example tokenizer("(add 2 (subtract 4 2))");
 * @param input 源代码字符串
 * @returns tokens 分词结果
 */
const tokenizer = (input: string): Token[] => {
  let current = 0; // 标记源代码字符串的当前位置
  const tokens: Token[] = []; // 存储生成的tokens

  while (current < input.length) {
    let char = input[current];

    // 处理左括号
    if (char === "(") {
      tokens.push({ type: "paren", value: "(" });
      current++;
      continue;
    }

    // 处理右括号
    if (char === ")") {
      tokens.push({ type: "paren", value: ")" });
      current++;
      continue;
    }

    // 处理空格
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 处理数字
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "number", value });
      continue;
    }

    // 处理字符串
    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "string", value });
      continue;
    }

    // 处理名称（函数签名等）
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: "name", value });
      continue;
    }

    // 处理无法识别的字符
    throw new TypeError(`Unexpected character: ${char}`);
  }

  return tokens;
};

/**
 * @description 将tokens转换为AST
 * @param tokens
 * @returns AST
 */
const parser = (tokens: Token[]): Program => {
  let current = 0;
  // 递归解析tokens
  const walk = (): ASTNode => {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      } as NumberLiteral;
    }

    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      } as StringLiteral;
    }

    // 当我们遍历到 ( 时，意味着我们要对Lisp函数进行解析
    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current]; // 跳过左括号
      // 构建CallExpression节点
      let node: CallExpression = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };
      token = tokens[++current]; // 跳过函数名

      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new TypeError(`Unexpected token type: ${token.type}`);
  };

  // 构建AST根节点
  let ast: Program = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};

export { tokenizer, parser };
