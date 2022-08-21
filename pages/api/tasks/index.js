import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const tasks = await prisma.task.findMany();
    return res.status(405).json({
        success: true,
        data: tasks
    });
}