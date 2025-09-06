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
          const employee = await prisma.employee.findUnique({
            where: { employee_id: id },
          });
          if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
          }
          res.status(200).json(employee);
        } else {
          const employees = await prisma.employee.findMany();
          res.status(200).json(employees);
        }
        break;

      case 'POST':
        const newEmployee = await prisma.employee.create({
          data: req.body,
        });
        res.status(201).json(newEmployee);
        break;

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Employee ID required' });
        }
        const updatedEmployee = await prisma.employee.update({
          where: { employee_id: id },
          data: req.body,
        });
        res.status(200).json(updatedEmployee);
        break;

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Employee ID required' });
        }
        await prisma.employee.delete({
          where: { employee_id: id },
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
  }
}
