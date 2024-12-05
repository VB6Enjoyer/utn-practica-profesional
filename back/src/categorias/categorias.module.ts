import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriasController } from './controllers/categorias.controller';
import { CategoriasService } from './services/categorias.service';
import { Categoria } from './entities/categoria.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [CategoriasController],
    providers: [CategoriasService],
    imports: [TypeOrmModule.forFeature([Categoria]), AuthModule],
    exports: [CategoriasService],
})

export class CategoriasModule { }