import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { env } from "../config/env";
import prisma from "../shared/prisma";

const seedAdmin = async () => {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (existingAdmin) {
      console.log("Super Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      env.superAdmin.password,
      parseInt(env.bcryptSaltRound)
    );

    const adminData = await prisma.user.create({
      data: {
        email: env.superAdmin.email,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        fullName: env.superAdmin.fullName,
        isVerified: true,
      },
    });

    console.log("Super Admin Created Successfully!", adminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedAdmin;
