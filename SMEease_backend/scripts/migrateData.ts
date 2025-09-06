// @ts-nocheck
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

// Load employees data
const employeesPath = path.resolve(__dirname, '../../src/lib/employees.ts');
const employeesFile = fs.readFileSync(employeesPath, 'utf-8');
const employeesMatch = employeesFile.match(/export const employees: Employee\[\] = (\[.*\]);/s);
const employees = employeesMatch && employeesMatch[1] ? eval(employeesMatch[1]) : [];

// Load products data
const productsPath = path.resolve(__dirname, '../../src/lib/products.ts');
const productsFile = fs.readFileSync(productsPath, 'utf-8');
const productsMatch = productsFile.match(/export const products: Product\[\] = (\[.*\]);/s);
const products = productsMatch && productsMatch[1] ? eval(productsMatch[1]) : [];

// Helper to get unique suppliers
function getUniqueSuppliers(products) {
  const seen = new Map();
  for (const p of products) {
    const key = `${p.supplier.name}|${p.supplier.contact}|${p.supplier.email}`;
    if (!seen.has(key)) {
      seen.set(key, { ...p.supplier });
    }
  }
  return Array.from(seen.values());
}

async function main() {
  // 1. Insert suppliers
  const suppliers = getUniqueSuppliers(products);
  const supplierMap = {};
  for (const supplier of suppliers) {
    const created = await prisma.supplier.create({ data: supplier });
    supplierMap[`${supplier.name}|${supplier.contact}|${supplier.email}`] = created.supplier_id;
  }

  // 2. Insert products
  for (const product of products) {
    const supplierKey = `${product.supplier.name}|${product.supplier.contact}|${product.supplier.email}`;
    await prisma.product.create({
      data: {
        upc: product.upc,
        name: product.name,
        stock: product.stock,
        sold: product.sold,
        min_stock: product.minStock,
        supplier_id: supplierMap[supplierKey],
      },
    });
  }

  // 3. Insert employees
  for (const emp of employees) {
    await prisma.employee.create({
      data: {
        employee_id: emp.id,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        phone: emp.phone,
        email: emp.email,
        joined_date: new Date(Date.parse(emp.joined + ' 1')),
        status: emp.status,
        pay_type: emp.payType.toLowerCase(),
        salary: emp.payType === 'salary' ? emp.salary : null,
        hourly_rate: emp.payType === 'hourly' ? emp.hourlyRate : null,
        preferred_day_off: emp.preferredDayOff,
        default_shift: emp.defaultShift,
      },
    });
  }

  console.log('Migration complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
