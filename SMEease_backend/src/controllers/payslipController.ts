import { PrismaClient } from '../../generated/prisma/index.js';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function getAllPayslips(req: Request, res: Response) {
  try {
    const payslips = await prisma.payslip.findMany();
    res.json(payslips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payslips' });
  }
}

async function getPayslipById(req: Request, res: Response) {
  try {
    const payslip = await prisma.payslip.findUnique({
      where: { payslip_id: Number(req.params.id) },
    });
    if (!payslip) return res.status(404).json({ error: 'Payslip not found' });
    res.json(payslip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payslip' });
  }
}

async function createPayslip(req: Request, res: Response) {
  try {
    const payslip = await prisma.payslip.create({
      data: req.body,
    });
    res.status(201).json(payslip);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create payslip', details: error.message });
  }
}

async function updatePayslip(req: Request, res: Response) {
  try {
    const payslip = await prisma.payslip.update({
      where: { payslip_id: Number(req.params.id) },
      data: req.body,
    });
    res.json(payslip);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update payslip', details: error.message });
  }
}

async function deletePayslip(req: Request, res: Response) {
  try {
    await prisma.payslip.delete({
      where: { payslip_id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete payslip', details: error.message });
  }
}

export {
  getAllPayslips,
  getPayslipById,
  createPayslip,
  updatePayslip,
  deletePayslip,
};
