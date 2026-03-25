import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.resolve('server/data/products.json');

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const data = await fs.readFile(dataPath, 'utf-8');
    const products = JSON.parse(data);
    
    const newProduct = {
      ...body,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    
    products.push(newProduct);
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
    return newProduct;
  }
  
  if (method === 'DELETE') {
    const query = getQuery(event);
    const data = await fs.readFile(dataPath, 'utf-8');
    let products = JSON.parse(data);
    products = products.filter(p => p.id !== parseInt(query.id));
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
    return { success: true };
  }
});
