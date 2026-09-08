import fs from 'fs';

// 1. Fix CategoryPage.jsx
let catPage = fs.readFileSync('src/pages/CategoryPage.jsx', 'utf8');
if (!catPage.includes('const { t, l } = useLanguage();')) {
    catPage = catPage.replace('const { t } = useLanguage();', 'const { t, l } = useLanguage();');
}
catPage = catPage.replace(/\{scheme\.schemeName\}/g, '{l(scheme.schemeName)}');
fs.writeFileSync('src/pages/CategoryPage.jsx', catPage);

// 2. Fix AiResults.jsx
let aiResults = fs.readFileSync('src/pages/AiResults.jsx', 'utf8');
if (!aiResults.includes('const { t, l } = useLanguage();')) {
    aiResults = aiResults.replace('const { t } = useLanguage();', 'const { t, l } = useLanguage();');
}
aiResults = aiResults.replace(/\{scheme\.schemeName\}/g, '{l(scheme.schemeName)}');
aiResults = aiResults.replace(/\$\{scheme\.schemeName\}/g, '${l(scheme.schemeName)}');
fs.writeFileSync('src/pages/AiResults.jsx', aiResults);

// 3. Fix ChatMessage.jsx
let chatMsg = fs.readFileSync('src/components/ChatMessage.jsx', 'utf8');
if (!chatMsg.includes('import { useLanguage }')) {
    chatMsg = chatMsg.replace(/(import React.*?;\n)/, `$1import { useLanguage } from '../i18n/LanguageContext';\n`);
}
if (!chatMsg.includes('const { l } = useLanguage();')) {
    chatMsg = chatMsg.replace(
      /export default function ChatMessage\(\{\s*message\s*\}\)\s*\{/,
      `export default function ChatMessage({ message }) {\n  const { l } = useLanguage();`
    );
}
chatMsg = chatMsg.replace(/\{scheme\.schemeName\}/g, '{l(scheme.schemeName)}');
fs.writeFileSync('src/components/ChatMessage.jsx', chatMsg);

console.log('Final fixes applied.');
