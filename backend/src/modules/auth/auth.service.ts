import { generateToken, type JwtPayload } from '../../utils/jwt.js'
import { createUser, findUser, findUserByCorreo } from './auth.repository.js'

type LoginDTO = {
  email: string
  password: string
}

type RegisterDTO = {
  nombre: string
  apellido: string
  correo: string
  password: string
  confirmPassword: string
  telefono?: string
}

export const loginService = async (payload: LoginDTO) => {
  const { email, password } = payload

  if (!email || !password) {
    throw new Error('Correo y contraseña son obligatorios')
  }

  const user = await findUser(email)

  if (!user) {
    throw new Error('User not found')
  }

  const isValidPassword = user.password === password.trim()

  if (!isValidPassword) {
    throw new Error('Invalid credentials')
  }

  const jwtPayload: JwtPayload = {
    id: user.id,
    correo: user.correo
  }

  const token = generateToken(jwtPayload)

  return {
    user: {
      id: user.id,
      correo: user.correo
    },
    token
  }
}

export const registerUser = async (payload: RegisterDTO) => {
  const { nombre, apellido, correo, password, confirmPassword, telefono } =
    payload

  if (!nombre || !apellido || !correo || !password || !confirmPassword) {
    throw new Error('Todos los campos obligatorios deben ser completados')
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden')
  }

  const existingUser = await findUserByCorreo(correo)

  if (existingUser) {
    throw new Error('El correo ya está registrado')
  }

  const newUser = await createUser({
    nombre,
    apellido,
    correo,
    password,
    rolId: 2,
    telefono
  })

  return {
    id: newUser.id,
    nombre: newUser.nombre,
    apellido: newUser.apellido,
    correo: newUser.correo,
    telefonos: newUser.telefonos
  }
}