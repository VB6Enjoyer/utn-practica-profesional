import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RutinasController } from './controllers/rutinas.controller';
import { RutinasService } from './services/rutinas.service';
import { Rutina } from './entities/rutina.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
    controllers: [RutinasController],
    providers: [RutinasService],
    imports: [AuthModule, CategoriasModule, TypeOrmModule.forFeature([Rutina])],
    exports: [RutinasService],
})

export class RutinasModule { }