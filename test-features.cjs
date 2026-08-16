(async () => {
  const { SCHEMES, ALL_CATEGORY_SCHEMES } = await import('./src/data/schemes.js');
  const { CATEGORIES } = await import('./src/data/categories.js');
  const { filterSchemes, calculateSchemeMatches, findMatchingSchemesForAssistant, getSchemesForCategory } = await import('./src/utils/filterUtils.js');

  console.log("=== COMPREHENSIVE 70-SCHEME FEATURE TESTS ===");
  let allPass = true;

  // 1. Test Search for keywords
  const testKeywords = ['student', 'farmer', 'pension', 'business', 'loan', 'insurance', 'scholarship', 'skill', 'women', 'youth'];
  for (const kw of testKeywords) {
    const res = filterSchemes({ query: kw });
    if (res.length === 0) {
      console.error(`FAIL: Search for '${kw}' returned 0 results!`);
      allPass = false;
    } else {
      console.log(`✓ Search '${kw}' returned ${res.length} schemes`);
    }
  }

  // 2. Test Category Filtering for all 10 categories
  for (const cat of CATEGORIES) {
    const list = getSchemesForCategory(cat.slug);
    if (list.length !== 7) {
      console.error(`FAIL: getSchemesForCategory('${cat.slug}') returned ${list.length}, expected 7`);
      allPass = false;
    } else {
      console.log(`✓ Category '${cat.slug}': ${list.length}/7 schemes`);
    }
  }

  // 3. Test Personalization Profiles
  const studentProfile = { age: "19", occupation: "Student", role: "student", income: "Below ₹1 lakh", state: "Delhi (NCT)" };
  const studentMatches = calculateSchemeMatches(studentProfile);
  const studentTop = studentMatches.slice(0, 3).map(s => s.schemeName);
  console.log(`✓ Student Top Matches:`, studentTop);
  if (!studentMatches.some(s => s.matchLevel === 'high')) {
    console.error(`FAIL: No High Match for student`);
    allPass = false;
  }

  const farmerProfile = { age: "42", occupation: "Farmer", role: "farmer", income: "₹1–3 lakh", state: "Punjab" };
  const farmerMatches = calculateSchemeMatches(farmerProfile);
  const farmerTop = farmerMatches.slice(0, 3).map(s => s.schemeName);
  console.log(`✓ Farmer Top Matches:`, farmerTop);
  if (!farmerMatches.some(s => s.matchLevel === 'high')) {
    console.error(`FAIL: No High Match for farmer`);
    allPass = false;
  }

  const businessProfile = { age: "32", occupation: "Business owner", role: "entrepreneur", income: "₹3–5 lakh", state: "Maharashtra" };
  const bizMatches = calculateSchemeMatches(businessProfile);
  const bizTop = bizMatches.slice(0, 3).map(s => s.schemeName);
  console.log(`✓ Business Top Matches:`, bizTop);
  if (!bizMatches.some(s => s.matchLevel === 'high')) {
    console.error(`FAIL: No High Match for business`);
    allPass = false;
  }

  const employeeProfile = { age: "48", occupation: "Employee", role: "employee", income: "₹10–18 lakh", state: "Central" };
  const empMatches = calculateSchemeMatches(employeeProfile);
  const empTop = empMatches.slice(0, 3).map(s => s.schemeName);
  console.log(`✓ Employee Top Matches:`, empTop);

  // 4. Test Assistant query matching
  const asstRes = findMatchingSchemesForAssistant("I need education loans for higher college studies");
  console.log(`✓ Assistant matched ${asstRes.length} schemes for education query. Top:`, asstRes[0]?.schemeName);
  if (asstRes.length === 0) {
    console.error(`FAIL: Assistant matching returned 0 results`);
    allPass = false;
  }

  if (allPass) {
    console.log("\n>>> ALL TEST SUITES PASSED! <<<");
    process.exit(0);
  } else {
    console.error("\n>>> TESTS FAILED! <<<");
    process.exit(1);
  }
})();
