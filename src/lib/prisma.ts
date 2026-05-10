// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const prismaClientSingleton = () => {
  // Pecah DATABASE_URL menjadi bagian-bagian terpisah
  const databaseUrl = new URL(process.env.DATABASE_URL as string);

  // Masukkan kredensial ke dalam adapter
  const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: parseInt(databaseUrl.port, 10) || 3306,
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.slice(1), // Menghilangkan garis miring '/' di awal nama DB
  });

  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
