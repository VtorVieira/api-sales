import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'sales',
  synchronize: true,
  logging: true,
  entities: [],
  migrations: ['./src/shared/typeorm/migrations/*.ts']
});
