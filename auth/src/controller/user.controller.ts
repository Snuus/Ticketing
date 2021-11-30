import { Request, Response, NextFunction } from "express";
//Comes from our npm pack
import { BadRequestError } from "@tickis/common";
import config from "config";
import { createUser, loginUser } from "../services/user.service";
import { signJwt } from "@tickis/common";
import logger from "../utils/logger";


export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body); // call create user service

    const userJwt = signJwt(
      { user },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes)
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send({ user: user });
  } catch (e: any) {
    //custom console log
    logger.error(e);
    // send error to client
    throw new BadRequestError(e);
  }
}


export async function loginUserHandler(req: Request, res: Response) {
  try {

    const user = await loginUser(req.body); // call create user service

    const userJwt = signJwt(
      { user },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes)
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send({ user: user });
  } catch (e: any) {
    //custom console log
    logger.error(e);
    // send error to client
    throw new BadRequestError(e);
  }
}


export async function currentUserHandler(req: Request, res: Response) {
  try {

    return res.status(200).send(req.user || null);
  } catch (e: any) {
    //custom console log
    logger.error(e);

    // send error to client
    throw new BadRequestError(e);
  }
}

export async function signoutUserHandler(req: Request, res: Response) {
  try {
    req.session = null

    return res.status(200).send({});
  } catch (e: any) {
    //custom console log
    logger.error(e);

    // send error to client
    throw new BadRequestError(e);
  }
}
