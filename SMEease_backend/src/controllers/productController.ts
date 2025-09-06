import { PrismaClient } from '../../generated/prisma/index.js';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: true
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const product = await prisma.product.findUnique({
      where: { upc: req.params.id },
      include: {
        supplier: true
      }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

async function createProduct(req: Request, res: Response) {
  try {
    const product = await prisma.product.create({
      data: req.body,
      include: {
        supplier: true
      }
    });
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
}

async function updateProduct(req: Request, res: Response) {
  try {
    const product = await prisma.product.update({
      where: { upc: req.params.id },
      data: req.body,
      include: {
        supplier: true
      }
    });
    res.json(product);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update product', details: error.message });
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    await prisma.product.delete({
      where: { upc: req.params.id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete product', details: error.message });
  }
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
