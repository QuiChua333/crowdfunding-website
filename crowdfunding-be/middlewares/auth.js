import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next) {
   
    try {
        let token = req.headers?.authorization;
        if (token) {
            token = token.split(' ')[1];
            let data = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
            req.userId = data.id
        }
        else {
            throw new Error('Unauthorized user')
        }
        next()
        
    } catch (error) {
        debugger
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                message: 'Token is expired'
            })
        }
        else {
            res.status(401).json({
                message: error.message
            })
        }
      
    }
}