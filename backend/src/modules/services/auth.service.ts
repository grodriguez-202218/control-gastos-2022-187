import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const AuthService = {
  register: async (data: User) => {
    const existing = await UserModel.findByEmail(data.email);
    if (existing) {
      throw new Error("El correo ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await UserModel.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  },

  login: async (email: string, password: string) => {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Credenciales inválidas");
    }

const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1m" }
    );

    return {
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    };
  },
};