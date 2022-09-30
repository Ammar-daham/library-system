import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/User'
import { VerifiedCallback, ParsedToken } from '../types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        console.log('googleId: ', googleId)
        console.log('parsedToken: ', parsedToken)
        const email = parsedToken.payload.email
        let user: any = await User.findOne({ email })
        if (!user) {
          user = new User({
            username: parsedToken.payload.name,
            firstname: parsedToken.payload.given_name,
            lastname: parsedToken.payload.family_name,
            email,
            isAdmin: email === 'ammar.daham@integrify.io',
          })
          user.save()
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}
