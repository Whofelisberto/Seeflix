'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginSubit() {
 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();


  const [registroNome, setRegistroNome] = useState("");
  const [registroEmail, setRegistroEmail] = useState("");
  const [registroPassword, setRegistroPassword] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`Bem-vindo, ${data.user.name}!`);
        router.push("/");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login");
    }
  };


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: registroNome, email: registroEmail, password: registroPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`Conta criada! Bem-vindo, ${data.user.name}`);
        setRegistroNome("");
        setRegistroEmail("");
        setRegistroPassword("");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao criar conta");
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-start justify-center gap-15 flex-col md:flex-col lg:flex-row w-full px-4">
    
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg w-full md:w-3/4 lg:w-1/3 lg:min-h-[500px]"
      >
        <h2 className="text-white text-2xl mb-5 font-bold text-center uppercase sm:text-xl max-sm:text-sm">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold text-lg sm:text-sm max-sm:text-sm">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold text-lg sm:text-sm max-sm:text-sm">
            Senha
          </label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded uppercase sm:text-sm max-sm:text-sm"
        >
          Entrar
        </button>
      </form>

      
      <div className="w-full md:w-3/4 lg:w-1/3 mb-15">
        <div className="bg-gray-800 mb-5 p-4 rounded-lg">
          <h2 className="uppercase text-2xl text-center font-bold bg-green-500 rounded-lg py-2 text-white sm:text-lg max-sm:text-sm">
            Quero me cadastrar
          </h2>
          <p className="mt-3 text-white text-md uppercase sm:text-xs text-center max-sm:text-xs">
            Em apenas um passo, crie uma conta e finalize sua compra
          </p>
          <p className="text-white text-md uppercase sm:text-xs text-center max-sm:text-xs">
            Ainda não tem conta?
          </p>
        </div>

        <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-2xl mb-4 uppercase font-bold text-center sm:text-lg max-sm:text-sm">
            Cadastre-se
          </h2>
          <div className="mb-4">
            <label className="block text-white mb-2 font-semibold text-lg sm:text-sm max-sm:text-sm">
              Nome
            </label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
              value={registroNome}
              onChange={(e) => setRegistroNome(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2 font-semibold text-lg sm:text-sm max-sm:text-sm">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
              value={registroEmail}
              onChange={(e) => setRegistroEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2 mt-2 font-semibold text-lg sm:text-sm max-sm:text-sm">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
              value={registroPassword}
              onChange={(e) => setRegistroPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded uppercase sm:text-sm max-sm:text-sm"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}
