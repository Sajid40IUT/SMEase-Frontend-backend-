import express from 'express';
import { getAllTaxDocuments, getTaxDocumentById, createTaxDocument, updateTaxDocument, deleteTaxDocument } from '../controllers/taxDocumentController';

const router = express.Router();

router.get('/', getAllTaxDocuments);
router.get('/:id', getTaxDocumentById);
router.post('/', createTaxDocument);
router.put('/:id', updateTaxDocument);
router.delete('/:id', deleteTaxDocument);

export default router;
