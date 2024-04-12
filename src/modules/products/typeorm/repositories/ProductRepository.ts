import { Product } from '../entities/Product';
import { AppDataSource } from '@shared/typeorm/data-source';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  findByName(name: string): Promise<Product | null> {
    return this.findOne({ where: { name } });
  }
});
