(async () => {
  const { CATEGORIES } = await import('./src/data/categories.js');
  const { SCHEMES, ALL_CATEGORY_SCHEMES } = await import('./src/data/schemes.js');

  console.log("=== SCHEMESATHI DATA VALIDATION ===");

  let passed = true;

  // 1. Check total categories
  if (CATEGORIES.length !== 10) {
    console.error(`FAIL: Expected 10 categories, found ${CATEGORIES.length}`);
    passed = false;
  } else {
    console.log(`✓ Categories count: ${CATEGORIES.length}/10`);
  }

  // 2. Check total category memberships
  if (ALL_CATEGORY_SCHEMES.length !== 70) {
    console.error(`FAIL: Expected 70 category memberships, found ${ALL_CATEGORY_SCHEMES.length}`);
    passed = false;
  } else {
    console.log(`✓ Category memberships: ${ALL_CATEGORY_SCHEMES.length}/70`);
  }

  // 3. Check each category has 7 schemes
  const countsByCategory = {};
  for (const s of ALL_CATEGORY_SCHEMES) {
    countsByCategory[s.categorySlug] = (countsByCategory[s.categorySlug] || 0) + 1;
  }

  for (const cat of CATEGORIES) {
    const count = countsByCategory[cat.slug] || 0;
    if (count !== 7) {
      console.error(`FAIL: Category ${cat.name} (${cat.slug}) has ${count} schemes, expected 7`);
      passed = false;
    } else {
      console.log(`  ✓ ${cat.name}: 7/7`);
    }
  }

  // 4. Check all schemes have required fields
  for (const s of SCHEMES) {
    if (!s.id || s.id.length < 2) {
      console.error(`FAIL: Scheme missing valid ID:`, s);
      passed = false;
    }
    if (!s.schemeName || s.schemeName.length < 3) {
      console.error(`FAIL: Scheme ${s.id} missing valid schemeName`);
      passed = false;
    }
    if (!s.description || s.description.length < 10) {
      console.error(`FAIL: Scheme ${s.id} missing description`);
      passed = false;
    }
    if (!s.eligibilityCriteria || s.eligibilityCriteria.length < 5) {
      console.error(`FAIL: Scheme ${s.id} missing eligibilityCriteria`);
      passed = false;
    }
    if (!s.benefits || s.benefits.length === 0) {
      console.error(`FAIL: Scheme ${s.id} missing benefits`);
      passed = false;
    }
    if (!s.requiredDocuments || s.requiredDocuments.length === 0) {
      console.error(`FAIL: Scheme ${s.id} missing requiredDocuments`);
      passed = false;
    }
    if (!s.applicationProcess || s.applicationProcess.length === 0) {
      console.error(`FAIL: Scheme ${s.id} missing applicationProcess`);
      passed = false;
    }
    if (!s.officialApplicationUrl && !s.officialInformationUrl) {
      console.error(`FAIL: Scheme ${s.id} missing official links`);
      passed = false;
    }
  }

  // 5. Check official links format
  for (const s of SCHEMES) {
    if (s.officialApplicationUrl && s.officialApplicationUrl !== "Not Applicable" && !s.officialApplicationUrl.startsWith("http")) {
      console.error(`FAIL: Scheme ${s.id} has invalid application URL: ${s.officialApplicationUrl}`);
      passed = false;
    }
    if (s.officialInformationUrl && s.officialInformationUrl !== "Not Applicable" && !s.officialInformationUrl.startsWith("http")) {
      console.error(`FAIL: Scheme ${s.id} has invalid info URL: ${s.officialInformationUrl}`);
      passed = false;
    }
  }

  if (passed) {
    console.log("\n>>> ALL 70 SCHEMES & 10 CATEGORIES VALIDATED SUCCESSFULLY! <<<");
    process.exit(0);
  } else {
    console.error("\n>>> VALIDATION FAILED! <<<");
    process.exit(1);
  }
})();
