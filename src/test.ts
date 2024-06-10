import { tokenizer, parser } from "./compiler";

const input = `(add 2 (subtract4 2))`;
const tokens = tokenizer(input);
const ast = parser(tokens);
console.log(tokens);
console.log("------");
console.log(ast);

// @ts-expect-error
console.log(ast.body[0].params);
