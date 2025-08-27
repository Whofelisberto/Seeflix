import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { OkPacket } from "mysql2";
import bcrypt from "bcryptjs";


export async function GET() {
  return NextResponse.json({ message: "Apenas POST é permitido aqui" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query<OkPacket>(
  "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
  [name, email, hashedPassword]
);


return NextResponse.json({
  message: "Usuário registrado com sucesso!",
  user: {
    id: result.insertId, 
    name,
    email,
  },
});
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário", details: error.message },
      { status: 500 }
    );
  }
}