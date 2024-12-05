import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CursosController } from './controllers/cursos.controller';
import { CursosService } from './services/cursos.service';
import { Curso } from './entities/curso.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [CursosController],
    providers: [CursosService],
    imports: [CategoriasModule, AuthModule, TypeOrmModule.forFeature([Curso])],
    exports: [CursosService],
})

export class CursosModule { }