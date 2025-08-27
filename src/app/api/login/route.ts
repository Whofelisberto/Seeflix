import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET() {
  return NextResponse.json({ message: "API funcionando" });
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Preencha todos os campos" }, { status: 400 });
  }

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await conn.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = (rows as any)[0];
    if (!user) return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 });

    const valido = await bcrypt.compare(password, user.password);
    if (!valido) return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 });

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
    response.cookies.set("token", token, { httpOnly: true, sameSite: "lax" });

    return response;
  } catch (e: any) {
    console.error("Error ao logar usuario", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
