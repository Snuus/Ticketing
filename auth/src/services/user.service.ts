
import { DocumentDefinition } from "mongoose";

import User, { UserDoc } from '../../models/User.model'

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

  const passwordMatch = await user.comparePassword(password)

  if (!passwordMatch) {
    throw 'Email or password do not match'
  }



  return user


}


export async function getUser(jwt: string) {

  const user = verifyJwt(jwt)


  return user


}
