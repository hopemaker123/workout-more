
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const resources = await prisma.resource.findMany();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resources' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
