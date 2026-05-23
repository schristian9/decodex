import { Request, Response, NextFunction } from 'express';
import { supabase } from './supabase';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
  token?: string;
}

/**
 * Express middleware to authenticate API requests using Supabase Auth JWT tokens.
 * Expects an 'Authorization: Bearer <jwt_token>' header.
 */
export async function authenticateUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }

    // Attach user profile information and token to the request object
    req.user = {
      id: user.id,
      email: user.email,
    };
    req.token = token;
    next();
  } catch (err: any) {
    console.error('Authentication middleware error:', err);
    return res.status(401).json({ error: 'Session authentication failed' });
  }
}

/**
 * Express middleware to optionally authenticate API requests.
 * Allows anonymous requests to pass through without setting req.user.
 */
export async function optionalAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // Proceed anonymously
  }

  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      req.user = {
        id: user.id,
        email: user.email,
      };
      req.token = token;
    }
    next();
  } catch (err: any) {
    // Silently ignore auth failure and proceed anonymously
    next();
  }
}
