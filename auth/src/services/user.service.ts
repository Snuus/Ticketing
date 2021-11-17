
import { DocumentDefinition } from "mongoose";

import User, { UserDoc } from '../../models/User.model'
import jwt from 'jsonwebtoken'



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
