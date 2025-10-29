import { nanoid } from "nanoid";

// generate userId
export const generate_userId = (num = 10) => {
  return "dz" + nanoid(num);
};
