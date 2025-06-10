import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriasModule } from './categorias/categorias.module';
import { CursosModule } from './cursos/cursos.module';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { ElementosModule } from './elementos/elementos.module';
import { RutinasModule } from './rutinas/rutinas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql202.infinityfree.com',
      port: 3306,
      username: 'if0_39195419',
      password: 'WCnsd8v2gHA30zJ',
      database: 'if0_39195419_gimnasio',
      autoLoadEntities: true,
      synchronize: false,
      logger: 'advanced-console'
    }),
    AuthModule,
    CategoriasModule,
    CursosModule,
    EjerciciosModule,
    ElementosModule,
    RutinasModule,
    JwtModule.register({
      global: true,
      secret: 'utn',
      signOptions: {
        expiresIn: '24h'
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
