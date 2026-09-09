const API_URL = 'http://localhost:3000/api/v1';

export const fetchSchemes = async (lang = 'en', category = null) => {
  try {
    let url = `${API_URL}/schemes?lang=${lang}`;
    if (category) url += `&category=${category}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch schemes');
    return await response.json();
  } catch (error) {
    console.error('Error in fetchSchemes:', error);
    return [];
  }
};

export const fetchSchemeBySlug = async (slug, lang = 'en') => {
  try {
    const response = await fetch(`${API_URL}/schemes/${slug}?lang=${lang}`);
    if (!response.ok) throw new Error('Failed to fetch scheme details');
    return await response.json();
  } catch (error) {
    console.error('Error in fetchSchemeBySlug:', error);
    return null;
  }
};

export const searchSchemes = async (query, lang = 'en') => {
  try {
    const response = await fetch(`${API_URL}/schemes/search?q=${encodeURIComponent(query)}&lang=${lang}`);
    if (!response.ok) throw new Error('Failed to search schemes');
    return await response.json();
  } catch (error) {
    console.error('Error in searchSchemes:', error);
    return [];
  }
};

export const fetchCategories = async (lang = 'en') => {
  try {
    const response = await fetch(`${API_URL}/categories?lang=${lang}`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
};
