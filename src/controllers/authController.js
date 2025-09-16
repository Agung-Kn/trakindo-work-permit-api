import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../configurations/database.js";
import serializeBigInt from "../helpers/serializeBigInt.js"
import response from "../response.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        Role: {
          connect: { id: BigInt(1) },
        },
      },
      include: {
        Role: true,
      },
    });

    res.json(response(res, 200, serializeBigInt(user), "Register successfully"))
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { Role: true },
    });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const safeUser = serializeBigInt(user);

    const profile = {
      name: safeUser.name,
      email: safeUser.email,
      roles: safeUser.Role.map((r) => r.name),
    };

    const accessExpiresIn = 15 * 60; // 15 minute
    // const accessExpiresIn = 7 * 24 * 60 * 60; // 15 minute
    const accessToken = jwt.sign(
      { id: safeUser.id, email: safeUser.email, roles: profile.roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessExpiresIn }
    );
    const expiredAt = new Date(Date.now() + accessExpiresIn * 1000).toISOString();

    const refreshExpiresIn = 7 * 24 * 60 * 60; // 7 day
    const refreshToken = jwt.sign(
      { id: safeUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: refreshExpiresIn }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: refreshExpiresIn * 1000,
    });

    res.json({ accessToken, expiredAt, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { Role: true },
    });
    
    if (!user) return res.status(403).json({ message: "Forbidden" });

    const safeUser = serializeBigInt(user);

    const profile = {
      name: safeUser.name,
      email: safeUser.email,
      roles: safeUser.Role.map((r) => r.name),
    };

    const accessExpiresIn = 15 * 60;
    const newAccessToken = jwt.sign(
      { id: safeUser.id, email: safeUser.email, roles: profile.roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessExpiresIn }
    );
    const expiredAt = new Date(Date.now() + accessExpiresIn * 1000).toISOString();

    res.json({ accessToken: newAccessToken, expiredAt, profile });
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { Role: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const safeUser = serializeBigInt(user);
    const profile = {
      name: safeUser.name,
      email: safeUser.email,
      roles: safeUser.Role.map((r) => r.name),
    };
    res.json(response(res, 200, profile, "Profile retrieved successfully"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};