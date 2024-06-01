import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../repositories/OrdersRepository';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}
