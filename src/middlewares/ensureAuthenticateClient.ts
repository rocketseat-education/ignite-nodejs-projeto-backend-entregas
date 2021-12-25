import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, '739f8ebd49733117a132c34fe866bc09') as IPayload;

    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token!' });
  }
}
