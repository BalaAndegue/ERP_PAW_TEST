// lib/export-utils.ts
import { utils, writeFile } from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = async (data: any[], fileName: string) => {
  const csvContent = data.map(row => 
    Object.values(row).join(',')
  ).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  link.click();
};

export const exportToExcel = async (data: any[], fileName: string) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Tiers');
  writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPDF = async (data: any[], fileName: string) => {
  const doc = new jsPDF();
  const headers = [Object.keys(data[0])];
  const rows = data.map(item => Object.values(item).map(String));
  
  autoTable(doc, {
    head: headers,
    body: rows,
  });
  
  doc.save(`${fileName}.pdf`);
};