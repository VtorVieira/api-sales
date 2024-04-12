import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

export default class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({
      where: {
        id
      }
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    await productsRepository.remove(product);
  }
}
