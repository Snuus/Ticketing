
import { DocumentDefinition, FilterQuery } from "mongoose";
import User from '../../models/User.model'


export async function createUser({ email, password }: { email: string, password: string }) {
  try {

    console.log(email)
    const existingUser = await User.findOne({ email: email })
    console.log(existingUser)
    if (existingUser) {
      console.log(existingUser)
      return false
    }
    const user = User.build({ email, password })
    await user.save()
    return user.toJSON()

  } catch (e: any) {
    throw new Error(e)
  }
}
