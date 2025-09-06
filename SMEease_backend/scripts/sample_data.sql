-- Sample data for Supplier
INSERT INTO "Supplier" (name, contact, email) VALUES
  ('Tech Distributors Ltd.', '+1-555-1234', 'sales@techdist.com'),
  ('KeyPro Supplies', '+1-555-2345', 'info@keypro.com'),
  ('Mouse Masters', '+1-555-3456', 'support@mousemasters.com'),
  ('Display Depot', '+1-555-4567', 'contact@displaydepot.com'),
  ('Storage Solutions', '+1-555-5678', 'orders@storagesol.com');

-- Sample data for Product (update supplier_id as needed after inserting suppliers)
INSERT INTO "Product" (upc, name, stock, sold, min_stock, supplier_id) VALUES
  ('123456789012', 'Gaming Laptop', 5, 120, 10, 1),
  ('234567890123', 'Mechanical Keyboard', 2, 80, 5, 2),
  ('345678901234', 'Wireless Mouse', 25, 200, 10, 3),
  ('456789012345', '4K Monitor', 0, 60, 3, 4),
  ('567890123456', 'External SSD', 15, 150, 8, 5);

-- Sample data for Employee
INSERT INTO "Employee" (
  employee_id, name, role, department, phone, email, joined_date, status, pay_type, salary, hourly_rate, preferred_day_off, default_shift
) VALUES
  ('EMP-1023', 'Ayesha Rahman', 'Store Supervisor', 'Sales', '+880 17XXXXXXXX', 'ayesha@company.com', '2023-03-01', 'Active', 'salary', 62400, NULL, 'Friday', '09:00 AM - 05:00 PM'),
  ('EMP-1024', 'Sohel Mia', 'Cashier', 'Sales', '+880 18XXXXXXXX', 'sohel@company.com', '2022-04-01', 'Active', 'salary', 48000, NULL, 'Saturday', '10:00 AM - 06:00 PM'),
  ('EMP-1025', 'Jannatul Ferdous', 'Sales Associate', 'Sales', '+880 19XXXXXXXX', 'jannatul@company.com', '2021-05-01', 'On Leave', 'salary', 45000, NULL, 'Sunday', '11:00 AM - 07:00 PM'),
  ('EMP-1026', 'Rahim Uddin', 'Inventory Manager', 'Inventory', '+880 16XXXXXXXX', 'rahim@company.com', '2020-06-01', 'Active', 'salary', 50000, NULL, 'Monday', '08:00 AM - 04:00 PM'),
  ('EMP-1027', 'Fatema Begum', 'Store Supervisor', 'Sales', '+880 15XXXXXXXX', 'fatema@company.com', '2021-07-01', 'Active', 'salary', 55000, NULL, 'Wednesday', '09:00 AM - 05:00 PM'); 

-- Sample data for PayrollPeriod
INSERT INTO "PayrollPeriod" (start_date, end_date, pay_date) VALUES
  ('2024-05-01', '2024-05-15', '2024-05-20'),
  ('2024-05-16', '2024-05-31', '2024-06-05');

-- Sample data for Payslip (employee_id and period_id must exist)
INSERT INTO "Payslip" (
  employee_id, period_id, gross_salary, federal_tax, state_tax, social_security, medicare, other_deductions, net_pay, status
) VALUES
  ('EMP-1023', 1, 2400, 200, 50, 100, 50, 0, 2000, 'paid'),
  ('EMP-1024', 1, 1800, 150, 40, 80, 40, 0, 1490, 'paid'),
  ('EMP-1025', 2, 1700, 140, 35, 75, 35, 0, 1415, 'pending');

-- Sample data for TaxDocument (employee_id must exist)
INSERT INTO "TaxDocument" (
  employee_id, tax_year, total_income, total_federal_tax, total_state_tax, created_on, file_path, status
) VALUES
  ('EMP-1023', 2023, 62400, 5200, 1300, '2024-01-15', '/docs/EMP-1023-2023.pdf', 'approved'),
  ('EMP-1024', 2023, 48000, 3900, 1040, '2024-01-15', '/docs/EMP-1024-2023.pdf', 'approved');

-- Sample data for Employee_Product_Sale (employee_id and product_upc must exist)
INSERT INTO "Employee_Product_Sale" (
  employee_id, product_upc, quantity, sale_date, label
) VALUES
  ('EMP-1023', '123456789012', 2, '2024-05-10', 'Sun'),
  ('EMP-1024', '234567890123', 1, '2024-05-11', 'Mon'),
  ('EMP-1025', '345678901234', 3, '2024-05-12', 'Tue'); 