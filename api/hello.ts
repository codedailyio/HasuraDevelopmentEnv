import { VercelRequest, VercelResponse } from "@vercel/node";
import { validateVerificationKey } from "../lib/validate";

const handler = (req: VercelRequest, res: VercelResponse) => {
  res.json({
    res: "Hello",
  });
};

export default validateVerificationKey(handler);
