
import { DocumentDefinition } from "mongoose";

import User, { UserDoc } from '../../models/User.model'
import jwt from 'jsonwebtoken'
import { verifyJwt } from "../utils/jwt.utils";



export async function createUser(input: DocumentDefinition<UserDoc>) {


  const { email, password } = input
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw 'Email already taken'
  }

  const user = User.build({ email, password })
  await user.save()

  return user


}



export async function loginUser(input: DocumentDefinition<UserDoc>) {


  const { email, password } = input
  const user = await User.findOne({ email })

  if (!user) {
    throw 'You have no account yet'
  }

  const validUser = await user.comparePassword(password)
  console.log(validUser)
  if (!validUser) {
    throw 'Email or password do not match'
  }



  return validUser


}
