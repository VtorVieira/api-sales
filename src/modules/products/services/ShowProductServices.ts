import AppError from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

export default class ShowProductService {
  public async execute(id: string): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({
      where: {
        id
      }
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}
