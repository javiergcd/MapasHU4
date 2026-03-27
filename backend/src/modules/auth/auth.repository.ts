import { prisma } from "../../lib/prisma.js";

interface CreateUserInput {
  nombre: string
  apellido: string
  correo: string
  password: string
  telefono?: string
}

export const createUser = async (data: CreateUserInput) => {
  return await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      password: data.password,
      rolId: 2,
      telefonos: data.telefono
        ? {
            create: {
              codigoPais: '+591',
              numero: data.telefono,
              principal: true
            }
          }
        : undefined
    },
    include: {
      telefonos: true
    }
  })
}

export const findUser = async (correo: string) => {
  return await prisma.usuario.findUnique({
    where: { correo },
  });
};

