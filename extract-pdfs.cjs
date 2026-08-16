const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfDir = 'C:\\Users\\mohdf\\Downloads';
const outDir = 'C:\\Users\\mohdf\\.gemini\\antigravity\\scratch\\pdf_texts';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const pdfFiles = [
  'Government_Schemes_Food_Security_and_Nutrition.pdf',
  'Government_Schemes_Sports_Youth_Culture.pdf',
  'Financial_Inclusion_Banking_Schemes.pdf',
  'Government_Schemes_Employment_Skill_Development.pdf',
  'Government_Schemes_Insurance_Social_Security.pdf',
  'government_schemes_business.pdf',
  'government_schemes_employees_pension.pdf',
  'Social_Justice_Government_Schemes.pdf',
  'Government_Schemes_Loans_Credit_Subsidies.pdf',
  'Government_Schemes_Education_and_Scholarships.pdf'
];

async function extractAll() {
  for (const file of pdfFiles) {
    const filePath = path.join(pdfDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Extracting: ${file}...`);
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ data: dataBuffer });
        const res = await parser.getText();
        const outName = file.replace('.pdf', '.txt');
        fs.writeFileSync(path.join(outDir, outName), res.text, 'utf8');
        console.log(`✓ Saved ${outName} (${res.text.length} chars)`);
      } catch (err) {
        console.error(`Error reading ${file}:`, err);
      }
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }
}

extractAll();
