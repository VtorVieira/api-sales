import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

export default class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const product = await ProductRepository.findOne({
      where: {
        id
      }
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    await ProductRepository.remove(product);
  }
}
