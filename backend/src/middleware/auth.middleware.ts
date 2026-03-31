import type { NextFunction, Request, Response } from 'express'
import { verifyJwtToken } from '../utils/jwt.js'
import { findActiveSessionByToken } from '../modules/auth/auth.repository.js'

export type AuthenticatedRequest = Request & {
  user?: {
    id: number
    correo?: string
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token no proporcionado'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Token no proporcionado'
    })
  }

  try {
    verifyJwtToken(token)

    const session = await findActiveSessionByToken(token)

    if (!session) {
      return res.status(401).json({
        message: 'Sesión inválida o expirada'
      })
    }

    ;(req as AuthenticatedRequest).user = {
      id: session.usuario.id,
      correo: session.usuario.correo
    }

    next()
  } catch {
    return res.status(401).json({
      message: 'Token inválido'
    })
  }
}
