import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Array of fields that are now objects
  const fields = ['schemeName', 'description', 'whyStarted', 'whoCanBenefit', 'howItWorks', 'keyBenefits', 'eligibilityCriteria'];
  
  fields.forEach(field => {
    const regex = new RegExp(`\\{scheme\\.${field}\\}`, 'g');
    content = content.replace(regex, `{l(scheme.${field})}`);
  });
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed', filePath);
}

fixFile('src/pages/AiResults.jsx');
fixFile('src/pages/CategoryPage.jsx');
fixFile('src/pages/SchemeDetails.jsx');

