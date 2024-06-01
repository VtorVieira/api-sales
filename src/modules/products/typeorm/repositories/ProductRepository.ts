import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}
@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name
      }
    });

    return product;
  }

  public async findAllByIds(producs: IFindProducts[]): Promise<Product[]> {
    const productIds = producs.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productIds)
      }
    });

    return existsProducts;
  }
}
