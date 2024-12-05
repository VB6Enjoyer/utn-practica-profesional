import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { CrearUsuarioDto } from "../dtos/crear-usuario.dto";
import { ModificarUsuarioDto } from "../dtos/modificar-usuario.dto";
import { Usuario } from "../entities/usuario.entity";
import { RolesEnum } from "../enums/roles.enum";

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>) { }

  async obtenerUsuarios(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find();

    if (usuarios.length == 0) {
      throw new NotFoundException(
        'No existen usuarios en la base de datos.',
      );
    }

    return usuarios;
  }

  async obtenerUsuarioPorId(idUsuario: number): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({
      where: { idUsuario: idUsuario },
      relations: ['cursos', 'cursos.rutinas', 'cursos.rutinas.ejercicios'],
    }); 

    if (!usuario) {
      throw new NotFoundException(
        'No existe un usuario con esta ID de usuario.',
      );
    }

    return usuario;
  }

  async obtenerUsuarioPorNombreDeUsuario(username: string): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({
      where: {
        username: username
      }
    });

    if (!usuario) {
      throw new NotFoundException(
        'No existe un usuario con este nombre de usuario.',
      );
    }

    return usuario;
  }

  async obtenerUsuarioPorDocumento(documento: string): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({
      where: {
        documento: documento
      }
    });

    if (!usuario) {
      throw new NotFoundException(
        'No existe un usuario con este número de documento.',
      );
    }

    return usuario;
  }

  async obtenerUsuariosPorRol(rol: RolesEnum): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        rol: rol,
      }
    });

    if (!usuarios || usuarios.length == 0) {
      throw new NotFoundException(
        'No se encontró ningún ' + rol.toString().toLowerCase + ' en la base de datos.',
      );
    }

    return usuarios;
  }

  async crearUsuario(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const usuario = new Usuario();

    usuario.username = crearUsuarioDto.username;
    usuario.password = await bcrypt.hash(crearUsuarioDto.password, 10);
    usuario.nombre = crearUsuarioDto.nombre;
    usuario.apellido = crearUsuarioDto.apellido;
    usuario.documento = crearUsuarioDto.documento;
    usuario.telefono = crearUsuarioDto.telefono;
    usuario.email = crearUsuarioDto.email;
    usuario.direccion = crearUsuarioDto.direccion;
    usuario.fechaNacimiento = crearUsuarioDto.fechaNacimiento;
    usuario.rol = crearUsuarioDto.rol;

    await this.usuariosRepo.save(usuario);

    return usuario;
  }

  async modificarUsuario(id: number, modificarUsuarioDto: ModificarUsuarioDto): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({ where: { idUsuario: id } });

    if (!usuario) {
      throw new Error('No se encontró un usuario con la ID especificada.');
    }

    if (modificarUsuarioDto.username !== undefined) {
      usuario.username = modificarUsuarioDto.username;
    }

    if (modificarUsuarioDto.password !== undefined) {
      usuario.password = await bcrypt.hash(modificarUsuarioDto.password, 10);
    }

    if (modificarUsuarioDto.nombre !== undefined) {
      usuario.nombre = modificarUsuarioDto.nombre;
    }

    if (modificarUsuarioDto.apellido !== undefined) {
      usuario.apellido = modificarUsuarioDto.apellido;
    }

    if (modificarUsuarioDto.documento !== undefined) {
      usuario.documento = modificarUsuarioDto.documento;
    }

    if (modificarUsuarioDto.telefono !== undefined) {
      usuario.telefono = modificarUsuarioDto.telefono;
    }

    if (modificarUsuarioDto.email !== undefined) {
      usuario.email = modificarUsuarioDto.email;
    }

    if (modificarUsuarioDto.direccion !== undefined) {
      usuario.direccion = modificarUsuarioDto.direccion;
    }

    if (modificarUsuarioDto.fechaNacimiento !== undefined) {
      usuario.fechaNacimiento = modificarUsuarioDto.fechaNacimiento;
    }

    if (modificarUsuarioDto.rol !== undefined) {
      usuario.rol = modificarUsuarioDto.rol;
    }

    await this.usuariosRepo.save(usuario);

    return usuario;
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.obtenerUsuarioPorId(id);

    if (!usuario) {
      throw new NotFoundException('No se encontró un usuario con el ID especificado.');
    }

    await this.usuariosRepo.remove(usuario);
  }
}