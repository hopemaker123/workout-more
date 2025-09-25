
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method === 'GET') {
    try {
      const verticals = await prisma.vertical.findMany();
      res.status(200).json(verticals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch verticals' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
