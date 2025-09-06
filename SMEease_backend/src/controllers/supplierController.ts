import { PrismaClient } from '../../generated/prisma/index.js';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function getAllSuppliers(req: Request, res: Response) {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
}

async function getSupplierById(req: Request, res: Response) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { supplier_id: Number(req.params.id) },
    });
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
}

async function createSupplier(req: Request, res: Response) {
  try {
    const supplier = await prisma.supplier.create({
      data: req.body,
    });
    res.status(201).json(supplier);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create supplier', details: error.message });
  }
}

async function updateSupplier(req: Request, res: Response) {
  try {
    const supplier = await prisma.supplier.update({
      where: { supplier_id: Number(req.params.id) },
      data: req.body,
    });
    res.json(supplier);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update supplier', details: error.message });
  }
}

async function deleteSupplier(req: Request, res: Response) {
  try {
    await prisma.supplier.delete({
      where: { supplier_id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete supplier', details: error.message });
  }
}

export {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
