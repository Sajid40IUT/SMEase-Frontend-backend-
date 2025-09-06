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
          const product = await prisma.product.findUnique({
            where: { upc: id },
            include: {
              supplier: true
            }
          });
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.status(200).json(product);
        } else {
          const products = await prisma.product.findMany({
            include: {
              supplier: true
            }
          });
          res.status(200).json(products);
        }
        break;

      case 'POST':
        const newProduct = await prisma.product.create({
          data: req.body,
          include: {
            supplier: true
          }
        });
        res.status(201).json(newProduct);
        break;

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Product UPC required' });
        }
        const updatedProduct = await prisma.product.update({
          where: { upc: id },
          data: req.body,
          include: {
            supplier: true
          }
        });
        res.status(200).json(updatedProduct);
        break;

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Product UPC required' });
        }
        await prisma.product.delete({
          where: { upc: id },
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
