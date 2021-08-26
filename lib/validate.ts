import { VercelRequest, VercelResponse, VercelApiHandler } from "@vercel/node";

export const validateVerificationKey = (handler: VercelApiHandler) => {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      if (
        !req.headers.verification_key ||
        (req.headers.verification_key as string) !==
          process.env.EVENT_SECRET_KEY
      ) {
        throw new Error("Verification key does not match");
      }
      await handler(req, res);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        code: error.message,
      });
    }
  };
};
