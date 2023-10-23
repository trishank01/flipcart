import CatchAsyncErrors from "../middlewares/CatchAsyncErrors.js";
import User from "../models/user.js";

export const registerUser = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
  });
});
