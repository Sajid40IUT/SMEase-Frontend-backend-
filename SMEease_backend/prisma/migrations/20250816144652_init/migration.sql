-- CreateEnum
CREATE TYPE "public"."PayType" AS ENUM ('salary', 'hourly');

-- CreateEnum
CREATE TYPE "public"."PayslipStatus" AS ENUM ('paid', 'pending');

-- CreateEnum
CREATE TYPE "public"."TaxDocStatus" AS ENUM ('approved', 'pending');

-- CreateTable
CREATE TABLE "public"."Employee" (
    "employee_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "joined_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "pay_type" "public"."PayType" NOT NULL,
    "salary" DECIMAL(65,30),
    "hourly_rate" DECIMAL(65,30),
    "preferred_day_off" TEXT NOT NULL,
    "default_shift" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "public"."Supplier" (
    "supplier_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "upc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "min_stock" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("upc")
);

-- CreateTable
CREATE TABLE "public"."Employee_Product_Sale" (
    "sale_id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "product_upc" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sale_date" TIMESTAMP(3),
    "label" TEXT,

    CONSTRAINT "Employee_Product_Sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "public"."PayrollPeriod" (
    "period_id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "pay_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollPeriod_pkey" PRIMARY KEY ("period_id")
);

-- CreateTable
CREATE TABLE "public"."Payslip" (
    "payslip_id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "period_id" INTEGER NOT NULL,
    "gross_salary" DECIMAL(65,30) NOT NULL,
    "federal_tax" DECIMAL(65,30) NOT NULL,
    "state_tax" DECIMAL(65,30) NOT NULL,
    "social_security" DECIMAL(65,30) NOT NULL,
    "medicare" DECIMAL(65,30) NOT NULL,
    "other_deductions" DECIMAL(65,30) NOT NULL,
    "net_pay" DECIMAL(65,30) NOT NULL,
    "status" "public"."PayslipStatus" NOT NULL,

    CONSTRAINT "Payslip_pkey" PRIMARY KEY ("payslip_id")
);

-- CreateTable
CREATE TABLE "public"."TaxDocument" (
    "tax_doc_id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "tax_year" INTEGER NOT NULL,
    "total_income" DECIMAL(65,30) NOT NULL,
    "total_federal_tax" DECIMAL(65,30) NOT NULL,
    "total_state_tax" DECIMAL(65,30) NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "file_path" TEXT NOT NULL,
    "status" "public"."TaxDocStatus" NOT NULL,

    CONSTRAINT "TaxDocument_pkey" PRIMARY KEY ("tax_doc_id")
);

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."Supplier"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee_Product_Sale" ADD CONSTRAINT "Employee_Product_Sale_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Employee_Product_Sale" ADD CONSTRAINT "Employee_Product_Sale_product_upc_fkey" FOREIGN KEY ("product_upc") REFERENCES "public"."Product"("upc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payslip" ADD CONSTRAINT "Payslip_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payslip" ADD CONSTRAINT "Payslip_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "public"."PayrollPeriod"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaxDocument" ADD CONSTRAINT "TaxDocument_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
