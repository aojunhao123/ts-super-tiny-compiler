import type { Token } from "./type";

/**
 * 分词器
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

export { tokenizer };
