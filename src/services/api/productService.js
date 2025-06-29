import productsData from '@/services/mockData/products.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  },

  async getByCategory(category) {
    await delay(250);
    return productsData.filter(p => 
      category === 'All' || p.category.toLowerCase() === category.toLowerCase()
    );
  },

  async getFeatured() {
    await delay(200);
    return productsData.filter(p => p.featured);
  },

async getCategories() {
    await delay(100);
    const categories = [...new Set(productsData.map(p => p.category))];
    return ['All', ...categories];
  },

  async getRecommended(currentProductId, category, limit = 4) {
    await delay(250);
    const currentId = parseInt(currentProductId);
    const recommended = productsData
      .filter(p => p.Id !== currentId && p.category === category)
      .slice(0, limit);
    
    // If not enough in same category, add from other categories
    if (recommended.length < limit) {
      const additional = productsData
        .filter(p => p.Id !== currentId && p.category !== category)
        .slice(0, limit - recommended.length);
      recommended.push(...additional);
    }
    
    return recommended;
  }
};