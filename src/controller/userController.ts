import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { error } from "console";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        address: true,
      },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuarios" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        address: true,
      },
    });
    if (!user)
      return res.status(404).json({ error: "Usuario nao encontrado!" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuarios" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "REQUESTBODY");
    const { name, email, phone, address } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address: {
          create: {
            street: address?.street,
            city: address?.city,
            isHome: address?.isHome ?? true,
          },
        },
      },
      include: { address: true },
    });
    res.status(200).json(newUser);
  } catch (err) {
    console.error("erro:", err);
    res.status(500).json({ error: "Erro ao criar usuario" });
  }
};

export const replaceUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
        phone,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err, "Erro ao editar usuario");
    res.status(500).json({
      err: "Erro ao editar usuario",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { address, name, email, phone } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
        phone,
      },
    });
    let updatedAddress;
    if (address && updatedUser.addressId !== null) {
      updatedAddress = await prisma.address.update({
        where: {
          id: updatedUser.addressId,
        },
        data: {
          street: address.street,
          city: address.city,
          isHome: address.isHone,
        },
      });
    }
    res.status(200).json({
      updatedUser,
      updatedAddress,
    });
  } catch (err) {
    console.error(err, "ERRO AO ATUALIZAR USUARIO");
    res.status(500).json({ error: "Ao atualizar usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (deletedUser.addressId !== null) {
      await prisma.address.delete({
        where: {
          id: deletedUser.addressId,
        },
      });
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err, "Erro ao deletar usuario");
    res.status(500).json({ erro: "erro ao deletar usuario" });
  }
};
