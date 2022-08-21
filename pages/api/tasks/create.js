import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await createTask(req, res);
    }

    return res.status(405).json({
        message: 'Method not allowed',
        success: false
    });
}

async function createTask(req, res) {
    const body = req.body;
    try {
        const newEntry = await prisma.task.create({
            data: {
                title: body.title,
                details: 'N/A',
                userId: 1,
            }
        });
        return res.status(200).json(newEntry, {success: true});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error creating question"
        });
    }
}
