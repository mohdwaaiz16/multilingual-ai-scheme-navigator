const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  try {
    // We dynamically import the ES modules from the frontend directory
    const categoriesModule = await import('../../../src/data/categories.js');
    const schemesModule = await import('../../../src/data/schemes.js');

    const categories = categoriesModule.CATEGORIES || [];
    const schemes = schemesModule.SCHEMES || [];

    console.log(`Found ${categories.length} categories and ${schemes.length} schemes.`);

    // 1. Seed Categories
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.id },
        update: {
          name: cat.name?.en || cat.id,
          description: cat.description?.en,
          icon: cat.icon
        },
        create: {
          slug: cat.id,
          name: cat.name?.en || cat.id,
          description: cat.description?.en,
          icon: cat.icon,
          translations: {
            create: [
              { languageCode: 'en', name: cat.name?.en || cat.id, description: cat.description?.en },
              { languageCode: 'hi', name: cat.name?.hi || cat.name?.en || cat.id, description: cat.description?.hi || cat.description?.en }
            ]
          }
        }
      });
    }
    console.log('Categories seeded.');

    // 2. Seed Schemes
    for (const scheme of schemes) {
      // Find category ID
      const dbCategory = await prisma.category.findUnique({
        where: { slug: scheme.categorySlug }
      });

      const newScheme = await prisma.scheme.upsert({
        where: { slug: scheme.id },
        update: {
          name: scheme.schemeName?.en || scheme.id,
          department: scheme.implementingMinistry,
          description: scheme.description?.en,
          benefitsText: typeof scheme.benefits === 'object' ? JSON.stringify(scheme.benefits?.en) : scheme.benefits,
          eligibilityText: typeof scheme.eligibility === 'object' ? JSON.stringify(scheme.eligibility?.en) : scheme.eligibility,
          applicationText: typeof scheme.applicationProcess === 'object' ? JSON.stringify(scheme.applicationProcess?.en) : scheme.applicationProcess,
          documentsText: typeof scheme.documentsRequired === 'object' ? JSON.stringify(scheme.documentsRequired?.en) : scheme.documentsRequired,
          officialUrl: scheme.officialUrl,
          status: 'PUBLISHED'
        },
        create: {
          slug: scheme.id,
          name: scheme.schemeName?.en || scheme.id,
          department: scheme.implementingMinistry,
          description: scheme.description?.en,
          benefitsText: typeof scheme.benefits === 'object' ? JSON.stringify(scheme.benefits?.en) : scheme.benefits,
          eligibilityText: typeof scheme.eligibility === 'object' ? JSON.stringify(scheme.eligibility?.en) : scheme.eligibility,
          applicationText: typeof scheme.applicationProcess === 'object' ? JSON.stringify(scheme.applicationProcess?.en) : scheme.applicationProcess,
          documentsText: typeof scheme.documentsRequired === 'object' ? JSON.stringify(scheme.documentsRequired?.en) : scheme.documentsRequired,
          officialUrl: scheme.officialUrl,
          status: 'PUBLISHED',
          translations: {
            create: [
              {
                languageCode: 'en',
                name: scheme.schemeName?.en || scheme.id,
                description: scheme.description?.en,
                benefitsText: typeof scheme.benefits === 'object' ? JSON.stringify(scheme.benefits?.en) : scheme.benefits,
                eligibilityText: typeof scheme.eligibility === 'object' ? JSON.stringify(scheme.eligibility?.en) : scheme.eligibility,
                applicationText: typeof scheme.applicationProcess === 'object' ? JSON.stringify(scheme.applicationProcess?.en) : scheme.applicationProcess,
                documentsText: typeof scheme.documentsRequired === 'object' ? JSON.stringify(scheme.documentsRequired?.en) : scheme.documentsRequired
              }
            ]
          },
          categories: dbCategory ? {
            create: [{ categoryId: dbCategory.id }]
          } : undefined
        }
      });

      // Handle tags / keywords
      if (scheme.tags && scheme.tags.length > 0) {
        for (const tag of scheme.tags) {
          // Check if exists
          const existingKeyword = await prisma.schemeKeyword.findFirst({
            where: { schemeId: newScheme.id, keyword: tag }
          });
          
          if (!existingKeyword) {
            await prisma.schemeKeyword.create({
              data: {
                schemeId: newScheme.id,
                keyword: tag
              }
            });
          }
        }
      }
    }
    
    console.log('Schemes seeded.');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
