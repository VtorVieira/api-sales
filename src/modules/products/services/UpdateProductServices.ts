import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productsRepository.findOne({
      where: {
        id
      }
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}
