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
        let user: any = await User.findOne({ email: parsedToken.payload.email })
        if (!user) {
          user = new User({
            name: parsedToken.payload.name,
            email: parsedToken.payload.email,
            isAdmin: false,
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
