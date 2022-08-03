import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', 
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20})
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,     // as a middleware, so put it before async function
  async (req: Request, res: Response ) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   throw new RequestValidationError(errors.array()); 
    // }
    const { email, password } = req.body;
    console.log("Creating a User!!");
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError('Email in Use');

    // simulate after email and password check, if it still has db issue
    // throw new DatabaseConnectionError();
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT:
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!  
    );
    // req.session.jwt = userJWT;     // incorrect format
    req.session = { jwt: userJWT };

    res.status(201).send(user);
  }
);

export { router as signupRouter };