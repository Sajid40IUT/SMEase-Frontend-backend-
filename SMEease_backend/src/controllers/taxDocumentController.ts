import { PrismaClient } from '../../generated/prisma/index.js';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

async function getAllTaxDocuments(req: Request, res: Response) {
  try {
    const documents = await prisma.taxDocument.findMany();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tax documents' });
  }
}

async function getTaxDocumentById(req: Request, res: Response) {
  try {
    const document = await prisma.taxDocument.findUnique({
      where: { tax_doc_id: Number(req.params.id) },
    });
    if (!document) return res.status(404).json({ error: 'Tax document not found' });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tax document' });
  }
}

async function createTaxDocument(req: Request, res: Response) {
  try {
    const document = await prisma.taxDocument.create({
      data: req.body,
    });
    res.status(201).json(document);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create tax document', details: error.message });
  }
}

async function updateTaxDocument(req: Request, res: Response) {
  try {
    const document = await prisma.taxDocument.update({
      where: { tax_doc_id: Number(req.params.id) },
      data: req.body,
    });
    res.json(document);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update tax document', details: error.message });
  }
}

async function deleteTaxDocument(req: Request, res: Response) {
  try {
    await prisma.taxDocument.delete({
      where: { tax_doc_id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete tax document', details: error.message });
  }
}

export {
  getAllTaxDocuments,
  getTaxDocumentById,
  createTaxDocument,
  updateTaxDocument,
  deleteTaxDocument,
};
