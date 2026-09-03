import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    // VERIFICAR SE O TOKEN FOI ENVIADO NO FORMATO "BEARER <TOKEN>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ erro: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    // VALIDA AS ASSINATURA MATEMATICA DO TOKEN COM A CHAVE SECRETA
    const usuarioDecodificado = jwt.verify(token, JWT_SECRET);

    // SALVA OS DADOS DO USUARIO NA REQUISIÇAO
    (req as any).user = usuarioDecodificado;

    return next();
  } catch {
    return res.status(401).json({ erro: 'Token invalido ou expirado.' });
  }
}
