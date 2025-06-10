import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sql108.byethost17.com',
  port: 3306,
  username: 'b17_39195534',
  password: 'DB_PASSWORD',
  database: 'b17_39195534_gimnasio',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};

export default config;
