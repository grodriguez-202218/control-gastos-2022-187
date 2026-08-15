import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { fullName, email, password, confirmPassword, role } = req.body;

      if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Las contraseñas no coinciden" });
      }

      const newUser = await AuthService.register({
        full_name: fullName,
        email,
        password,
        role: role === "admin" ? "admin" : "user",
      });

      return res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
      }

      const result = await AuthService.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  },
};