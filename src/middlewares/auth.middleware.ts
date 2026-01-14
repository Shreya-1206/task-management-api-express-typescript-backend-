import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check token exists in header sent by client
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    
    const decoded = jwt.verify(   // verifies token and decode it back to {userId, issed at , expiry time}
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
     
    // console.log(decoded)
    
    (req as any).user = { id: decoded.userId }; // attach decoded user id to req.user

    //Continue and pass req.user.id to any req and there controller 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
