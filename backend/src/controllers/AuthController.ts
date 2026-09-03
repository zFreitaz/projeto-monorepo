import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWT_SECRET } from '../config/auth';

export class AuthController {
  // POST /api/auth/login
  public static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
      }

      // BUSCA USUARIO NO BANCO LOCAL
      const user = await User.findOne({
        where: { email: email.trim().toLowerCase() },
      });
      if (!user || !user.senha_hash) {
        return res.status(401).json({ erro: 'Credenciais invalidas.' });
      }

      // VALIDAR A SENHA COMPARANDO O TEXTO PURO COM O HASH
      const senhaValida = await bcrypt.compare(password, user.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais invalidas.' });
      }

      // GERAR O TOKEN JWT COM VALIDADE DE 1 HORA
      const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome },
        JWT_SECRET,
        { expiresIn: '1h' },
      );

      return res.status(200).json({
        mensagem: 'Login realizado com sucesso!',
        token,
      });
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }
}
