const prisma = require('../utils/prisma');

const formatSchemeResponse = (scheme, lang) => {
  const translation = scheme.translations?.[0];
  
  // Create an object structure similar to the frontend's current static data
  return {
    id: scheme.slug,
    slug: scheme.slug,
    name: translation?.name || scheme.name,
    category: scheme.categories?.[0]?.category?.slug || 'general',
    department: scheme.department,
    ministry: scheme.ministry,
    tags: scheme.keywords?.map(k => k.keyword) || [],
    description: translation?.description || scheme.description,
    benefits: translation?.benefitsText || scheme.benefitsText,
    eligibility: translation?.eligibilityText || scheme.eligibilityText,
    applicationProcess: translation?.applicationText || scheme.applicationText,
    documentsRequired: translation?.documentsText || scheme.documentsText,
    officialUrl: scheme.officialUrl,
    status: scheme.status
  };
};

const getAllSchemes = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const category = req.query.category;
    
    let whereClause = { status: 'PUBLISHED' };
    
    if (category) {
      whereClause.categories = {
        some: {
          category: {
            slug: category
          }
        }
      };
    }

    const schemes = await prisma.scheme.findMany({
      where: whereClause,
      include: {
        translations: {
          where: { languageCode: lang }
        },
        categories: {
          include: {
            category: true
          }
        },
        keywords: true
      }
    });

    const formattedSchemes = schemes.map(s => formatSchemeResponse(s, lang));
    res.json(formattedSchemes);
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
};

const getSchemeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang || 'en';

    const scheme = await prisma.scheme.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { languageCode: lang }
        },
        categories: {
          include: {
            category: true
          }
        },
        keywords: true
      }
    });

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    res.json(formatSchemeResponse(scheme, lang));
  } catch (error) {
    console.error('Error fetching scheme:', error);
    res.status(500).json({ error: 'Failed to fetch scheme' });
  }
};

const searchSchemes = async (req, res) => {
  try {
    const { q, lang = 'en' } = req.query;
    
    if (!q) {
      return res.json([]);
    }

    // Basic text search using Prisma (in a real system, you'd use full-text search or embeddings)
    const schemes = await prisma.scheme.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          {
            translations: {
              some: {
                AND: [
                  { languageCode: lang },
                  {
                    OR: [
                      { name: { contains: q, mode: 'insensitive' } },
                      { description: { contains: q, mode: 'insensitive' } }
                    ]
                  }
                ]
              }
            }
          }
        ]
      },
      include: {
        translations: {
          where: { languageCode: lang }
        },
        categories: {
          include: {
            category: true
          }
        },
        keywords: true
      }
    });

    const formattedSchemes = schemes.map(s => formatSchemeResponse(s, lang));
    res.json(formattedSchemes);
  } catch (error) {
    console.error('Error searching schemes:', error);
    res.status(500).json({ error: 'Failed to search schemes' });
  }
};

module.exports = {
  getAllSchemes,
  getSchemeBySlug,
  searchSchemes
};
