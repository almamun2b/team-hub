import prisma from "../../../shared/prisma";

const createLog = async (data: any) => {
  const result = await prisma.auditLog.create({
    data,
  });
  return result;
};

const getWorkspaceLogs = async (workspaceId: string) => {
  const result = await prisma.auditLog.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, fullName: true },
      },
    },
  });
  return result;
};

export const AuditLogServices = {
  createLog,
  getWorkspaceLogs,
};
