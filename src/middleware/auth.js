import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserRepository from '../repositories/user.repository.js';
import { jwtKey } from '../config/auth.js';

const userRepository = new UserRepository();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtKey;

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    const { email } = jwtPayload;

    try {
        const user = await userRepository.findOne({
            filter: {
                email: email,
            }
        });
        
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        done(err, false);
    }
}));

export default passport.authenticate('jwt', { session: false });