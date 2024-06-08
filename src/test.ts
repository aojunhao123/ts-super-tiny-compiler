import { tokenizer } from "./compiler";

const input = `add(2 subtract(4 2))`;
const tokens = tokenizer(input);
console.log(tokens);
