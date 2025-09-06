import { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { query } = req;
    const id = query.id as string;

    switch (req.method) {
      case 'GET':
        if (id) {
          const period = await prisma.payrollPeriod.findUnique({
            where: { period_id: parseInt(id) },
          });
          if (!period) {
            return res.status(404).json({ error: 'Payroll period not found' });
          }
          res.status(200).json(period);
        } else {
          const periods = await prisma.payrollPeriod.findMany();
          res.status(200).json(periods);
        }
        break;

      case 'POST':
        const newPeriod = await prisma.payrollPeriod.create({
          data: req.body,
        });
        res.status(201).json(newPeriod);
        break;

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Period ID required' });
        }
        const updatedPeriod = await prisma.payrollPeriod.update({
          where: { period_id: parseInt(id) },
          data: req.body,
        });
        res.status(200).json(updatedPeriod);
        break;

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Period ID required' });
        }
        await prisma.payrollPeriod.delete({
          where: { period_id: parseInt(id) },
        });
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request', details: error.message });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request', details: error.message });
  }
}
