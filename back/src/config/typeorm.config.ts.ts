import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'sql202.infinityfree.com',
  port: 3306,
  username: 'if0_39195419',
  password: 'WCnsd8v2gHA30zJ', // Yeah this should definitely be in an env file but I don't care enough right now.
  database: 'if0_39195419_gimnasio',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};

export default config;
