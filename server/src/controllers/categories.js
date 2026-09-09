const prisma = require('../utils/prisma');

const getAllCategories = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    
    // Fetch categories with translations
    const categories = await prisma.category.findMany({
      where: { status: 'ACTIVE' },
      include: {
        translations: {
          where: { languageCode: lang }
        }
      }
    });

    // Format response to match existing frontend structure
    const formattedCategories = categories.map(category => {
      const translation = category.translations[0];
      return {
        id: category.slug, // Frontend currently uses slug as id
        name: translation ? translation.name : category.name,
        description: translation ? translation.description : category.description,
        icon: category.icon,
        // In a real system, you'd calculate count dynamically, here we mock it or fetch it
        count: 0 
      };
    });

    res.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang || 'en';

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { languageCode: lang }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const translation = category.translations[0];
    res.json({
      id: category.slug,
      name: translation ? translation.name : category.name,
      description: translation ? translation.description : category.description,
      icon: category.icon
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryBySlug
};
