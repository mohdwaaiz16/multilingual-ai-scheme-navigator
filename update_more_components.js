import fs from 'fs';

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  if (!content.includes('import { useLanguage }')) {
    content = content.replace(/(import React.*?;\n)/, `$1import { useLanguage } from '../i18n/LanguageContext';\n`);
  }
  
  const componentMatch = content.match(/export default function (\w+)\(([^)]*)\) \{/);
  if (componentMatch && !content.includes('const { t, l } = useLanguage();') && !content.includes('const { t } = useLanguage();')) {
    content = content.replace(
      /export default function (\w+)\(([^)]*)\) \{/,
      `export default function $1($2) {\n  const { t, l } = useLanguage();`
    );
  } else if (!content.includes('const { t, l } = useLanguage();') && content.includes('const { t } = useLanguage();')) {
     content = content.replace('const { t } = useLanguage();', 'const { t, l } = useLanguage();');
  }
  
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

// SchemeFinder.jsx
replaceInFile('src/pages/SchemeFinder.jsx', [
  [/>\s*Find Schemes\s*</g, '>{t("navbar.findSchemes")}<'],
  [/>\s*All Categories\s*</g, '>{t("filters.selectCategory")}<'],
  [/>\s*All States\s*</g, '>{t("filters.selectState")}<'],
  [/>\s*Clear All\s*</g, '>{t("common.clearAll")}<'],
  [/>\s*No schemes found\s*</g, '>{t("common.noResults")}<'],
  [/\{category\.name\}/g, '{l(category.name)}'],
  [/placeholder="Search schemes\.\.\."/g, 'placeholder={t("filters.searchPlaceholder")}']
]);

// Assistant.jsx
replaceInFile('src/pages/Assistant.jsx', [
  [/>\s*SchemeSathi AI Assistant\s*</g, '>{t("assistant.title")}<'],
  [/>\s*Ask me anything in your language!\s*</g, '>{t("assistant.subtitle")}<'],
  [/>\s*Thinking\.\.\.\s*</g, '>{t("assistant.thinking")}<'],
  [/placeholder="Type your question here\.\.\."/g, 'placeholder={t("assistant.placeholder")}'],
  [/const INITIAL_MESSAGE = \{[^\}]*\};/g, 'const INITIAL_MESSAGE = { id: 1, type: "bot", text: t("assistant.welcome") };'],
  [/setMessages\(\[\{ id: 1, type: 'bot', text: '.*?' \}\]\);/g, "setMessages([{ id: 1, type: 'bot', text: t('assistant.welcome') }]);"],
  [/'What are the schemes for farmers\?'/g, 't("assistant.suggestions")[0] || "What are the schemes for farmers?"'],
  [/'Are there any education loans\?'/g, 't("assistant.suggestions")[1] || "Are there any education loans?"'],
  [/'What is PM-Kisan\?'/g, 't("assistant.suggestions")[2] || "What is PM-Kisan?"'],
  [/'Schemes for women entrepreneurs'/g, 't("assistant.suggestions")[3] || "Schemes for women entrepreneurs"']
]);

// AiResults.jsx
replaceInFile('src/pages/AiResults.jsx', [
  [/>\s*AI Match Results\s*</g, '>{t("navbar.aiAssistant")}<'],
  [/>\s*No matching schemes found\s*</g, '>{t("common.noResults")}<']
]);

console.log('More component updates finished.');
