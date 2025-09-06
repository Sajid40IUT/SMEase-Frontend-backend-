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
          const supplier = await prisma.supplier.findUnique({
            where: { supplier_id: parseInt(id) },
          });
          if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
          }
          res.status(200).json(supplier);
        } else {
          const suppliers = await prisma.supplier.findMany();
          res.status(200).json(suppliers);
        }
        break;

      case 'POST':
        const newSupplier = await prisma.supplier.create({
          data: req.body,
        });
        res.status(201).json(newSupplier);
        break;

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Supplier ID required' });
        }
        const updatedSupplier = await prisma.supplier.update({
          where: { supplier_id: parseInt(id) },
          data: req.body,
        });
        res.status(200).json(updatedSupplier);
        break;

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Supplier ID required' });
        }
        await prisma.supplier.delete({
          where: { supplier_id: parseInt(id) },
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
