import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ElementosController } from './controllers/elementos.controller';
import { ElementosService } from './services/elementos.service';
import { Elemento } from './entities/elemento.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TipoElemento } from './entities/tipo-elemento.entity';

@Module({
    controllers: [ElementosController],
    providers: [ElementosService],
    imports: [AuthModule, TypeOrmModule.forFeature([Elemento]), TypeOrmModule.forFeature([TipoElemento])],
    exports: [ElementosService],
})

export class ElementosModule { }