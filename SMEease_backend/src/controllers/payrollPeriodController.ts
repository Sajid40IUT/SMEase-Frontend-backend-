import { PrismaClient } from '../../generated/prisma/index.js';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function getAllPayrollPeriods(req: Request, res: Response) {
  try {
    const periods = await prisma.payrollPeriod.findMany();
    res.json(periods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll periods' });
  }
}

async function getPayrollPeriodById(req: Request, res: Response) {
  try {
    const period = await prisma.payrollPeriod.findUnique({
      where: { period_id: Number(req.params.id) },
    });
    if (!period) return res.status(404).json({ error: 'Payroll period not found' });
    res.json(period);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payroll period' });
  }
}

async function createPayrollPeriod(req: Request, res: Response) {
  try {
    const period = await prisma.payrollPeriod.create({
      data: req.body,
    });
    res.status(201).json(period);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create payroll period', details: error.message });
  }
}

async function updatePayrollPeriod(req: Request, res: Response) {
  try {
    const period = await prisma.payrollPeriod.update({
      where: { period_id: Number(req.params.id) },
      data: req.body,
    });
    res.json(period);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update payroll period', details: error.message });
  }
}

async function deletePayrollPeriod(req: Request, res: Response) {
  try {
    await prisma.payrollPeriod.delete({
      where: { period_id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete payroll period', details: error.message });
  }
}

export {
  getAllPayrollPeriods,
  getPayrollPeriodById,
  createPayrollPeriod,
  updatePayrollPeriod,
  deletePayrollPeriod,
};
