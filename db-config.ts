import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: 'conduit',
    password: 'conduit',
    database: 'conduit',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
  };
}
