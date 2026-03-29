import { Request, Response } from 'express'
import { loginService, registerUser } from './auth.service.js'

type RegisterBody = {
  nombre: string
  apellido: string
  correo: string
  password: string
  confirmPassword: string
  telefono?: string
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await loginService({ email, password })

    return res.status(200).json(result)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error interno del servidor'

    return res.status(400).json({ message })
  }
}

export const registerController = async (
  req: Request<unknown, unknown, RegisterBody>,
  res: Response
) => {
  try {
    const { nombre, apellido, correo, password, confirmPassword, telefono } =
      req.body

    const user = await registerUser({
      nombre,
      apellido,
      correo,
      password,
      confirmPassword,
      telefono
    })

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Error interno del servidor'

    return res.status(400).json({ message })
  }
}