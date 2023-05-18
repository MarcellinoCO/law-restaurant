import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'menu-db',
  port: 5432,
  username: 'menu1234',
  password: 'menu1234',
  database: 'menu',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
