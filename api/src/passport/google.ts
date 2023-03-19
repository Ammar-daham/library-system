import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/user'
import { VerifiedCallback, ParsedToken } from '../types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

export default function (): GoogleTokenStrategy {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ): Promise<void> => {
      try {
        console.log('googleId: ', googleId)
        console.log('parsedToken: ', parsedToken.payload)
        const email = parsedToken.payload.email
        let user: any = await User.findOne({ email })
        if (!user) {
          user = new User({
            username: parsedToken.payload.name,
            first_name: parsedToken.payload.given_name,
            last_name: parsedToken.payload.family_name,
            email: email,
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
