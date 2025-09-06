import express from 'express';
import employeeRoutes from './employee';
import supplierRoutes from './supplier';
import productRoutes from './product';
import saleRoutes from './sale';
import payrollPeriodRoutes from './payrollPeriod';
import payslipRoutes from './payslip';
import taxDocumentRoutes from './taxDocument';

const router = express.Router();

router.use('/employees', employeeRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/products', productRoutes);
router.use('/sales', saleRoutes);
router.use('/payroll-periods', payrollPeriodRoutes);
router.use('/payslips', payslipRoutes);
router.use('/tax-documents', taxDocumentRoutes);

export default router;
