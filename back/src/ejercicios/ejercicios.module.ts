import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { EjerciciosController } from './controllers/ejercicios.controller';
import { EjerciciosService } from './services/ejercicios.service';
import { Ejercicio } from './entities/ejercicio.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [EjerciciosController],
    providers: [EjerciciosService],
    imports: [AuthModule, TypeOrmModule.forFeature([Ejercicio])],
    exports: [EjerciciosService],
})

export class EjerciciosModule { }