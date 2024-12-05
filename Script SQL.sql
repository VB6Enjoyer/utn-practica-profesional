-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2024 a las 07:24:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gimnasio`
--
CREATE DATABASE IF NOT EXISTS `gimnasio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gimnasio`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `Tipo` varchar(45) NOT NULL,
  `Peso` double NOT NULL,
  `Modalidad` enum('Amateur','Profesional') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `Tipo`, `Peso`, `Modalidad`) VALUES
(1, 'Peso ligero', 60, 'Amateur'),
(2, 'Peso medio', 75, 'Amateur'),
(3, 'Peso superligero', 63.5, 'Profesional'),
(4, 'Peso medio', 72.5, 'Profesional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `Categoria_idCategoria` int(11) NOT NULL,
  `Nombre` varchar(128) DEFAULT NULL,
  `Lunes` tinyint(1) DEFAULT NULL,
  `Martes` tinyint(1) DEFAULT NULL,
  `Miercoles` tinyint(1) DEFAULT NULL,
  `Jueves` tinyint(1) DEFAULT NULL,
  `Viernes` tinyint(1) DEFAULT NULL,
  `Sabado` tinyint(1) DEFAULT NULL,
  `Domingo` tinyint(1) DEFAULT NULL,
  `Fecha_Inicio` date DEFAULT NULL,
  `Fecha_Fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idCurso`, `Categoria_idCategoria`, `Nombre`, `Lunes`, `Martes`, `Miercoles`, `Jueves`, `Viernes`, `Sabado`, `Domingo`, `Fecha_Inicio`, `Fecha_Fin`) VALUES
(1, 1, 'Peso ligero (Principiantes)', 1, 1, 0, 0, 1, 0, 0, '2024-03-01', '2024-07-31'),
(2, 2, 'Fuerza para peso medio', 0, 0, 1, 1, 1, 0, 0, '2024-06-17', '2024-08-19'),
(3, 3, 'Introducción al profesionalismo en Peso Superligero', 1, 0, 1, 0, 1, 0, 1, '2024-07-01', '2024-07-26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_has_rutina`
--

CREATE TABLE `curso_has_rutina` (
  `Curso_idCurso` int(11) NOT NULL,
  `Rutina_idRutina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `curso_has_rutina`
--

INSERT INTO `curso_has_rutina` (`Curso_idCurso`, `Rutina_idRutina`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(3, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio`
--

CREATE TABLE `ejercicio` (
  `idEjercicio` int(11) NOT NULL,
  `Ejercicio` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`idEjercicio`, `Ejercicio`) VALUES
(1, 'Sentadilla (3x10 repeticiones)'),
(2, 'Press de banca (2x5 repeticiones)'),
(3, 'Abdominales (3x20 repeticiones)'),
(4, 'Correr en cinta (10 minutos)'),
(5, 'Peso muerto (2x5 repeticiones)'),
(6, 'Plancha (3x30 segundos)'),
(7, 'Salto tijera (4x10 repeticiones)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio_rutina`
--

CREATE TABLE `ejercicio_rutina` (
  `idEjercicio` int(11) NOT NULL,
  `idRutina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ejercicio_rutina`
--

INSERT INTO `ejercicio_rutina` (`idEjercicio`, `idRutina`) VALUES
(1, 1),
(1, 7),
(2, 1),
(2, 3),
(3, 7),
(4, 2),
(5, 1),
(5, 3),
(6, 7),
(7, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elemento_ejercicio`
--

CREATE TABLE `elemento_ejercicio` (
  `idElemento_Trabajo` int(11) NOT NULL,
  `idEjercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `elemento_ejercicio`
--

INSERT INTO `elemento_ejercicio` (`idElemento_Trabajo`, `idEjercicio`) VALUES
(8, 3),
(8, 6),
(9, 4),
(10, 2),
(10, 5),
(11, 2),
(11, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elemento_trabajo`
--

CREATE TABLE `elemento_trabajo` (
  `idElemento_Trabajo` int(11) NOT NULL,
  `idTipo_Elemento` int(11) NOT NULL,
  `Descripcion` varchar(45) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `elemento_trabajo`
--

INSERT INTO `elemento_trabajo` (`idElemento_Trabajo`, `idTipo_Elemento`, `Descripcion`, `Cantidad`) VALUES
(1, 1, 'Mancuerna 30kg', 4),
(2, 1, 'Mancuerna 10kg', 6),
(3, 1, 'Mancuerna 5kg', 4),
(4, 1, 'Mancuerna 20kg', 4),
(5, 2, 'Guantes de boxeo medianos', 8),
(6, 2, 'Guantes de boxeo pequeños', 8),
(7, 3, 'Bolsa de boxeo 80cm', 3),
(8, 4, 'Colchoneta 1mx50x4', 8),
(9, 5, 'Cinta de correr Enerfit 735', 2),
(10, 6, 'Pesa 50kg', 2),
(11, 6, 'Pesa 75kg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina`
--

CREATE TABLE `rutina` (
  `idRutina` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Horario` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `rutina`
--

INSERT INTO `rutina` (`idRutina`, `idCategoria`, `Nombre`, `Horario`) VALUES
(1, 1, 'Rutina de fuerza', '17:00:00'),
(2, 1, 'Rutina de cardio', '18:00:00'),
(3, 2, 'Rutina de fuerza', '16:00:00'),
(4, 2, 'Rutina de cardio', '17:00:00'),
(5, 3, 'Rutina de cardio', '14:00:00'),
(6, 3, 'Rutina de fuerza', '15:30:00'),
(7, 3, 'Rutina de core', '16:30:00'),
(8, 4, 'Rutina de fuerza', '18:00:00'),
(9, 4, 'Rutina de cardio', '19:30:00'),
(10, 4, 'Rutina de core', '20:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_elemento`
--

CREATE TABLE `tipo_elemento` (
  `idTipo_Elemento` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipo_elemento`
--

INSERT INTO `tipo_elemento` (`idTipo_Elemento`, `Nombre`) VALUES
(1, 'Mancuerna'),
(2, 'Guantes de boxeo'),
(3, 'Bolsa de boxeo'),
(4, 'Colchoneta'),
(5, 'Cinta de correr'),
(6, 'Pesa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Rol` enum('Alumno','Tecnico','Profesor') NOT NULL,
  `Usuario` varchar(32) NOT NULL,
  `Contrasena` varchar(72) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `Apellido` varchar(45) DEFAULT NULL,
  `Documento` varchar(9) DEFAULT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Email` varchar(72) DEFAULT NULL,
  `Direccion` varchar(72) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Rol`, `Usuario`, `Contrasena`, `Nombre`, `Apellido`, `Documento`, `Telefono`, `Email`, `Direccion`, `FechaNacimiento`) VALUES
(1, 'Alumno', 'Acer28', '$2a$12$9RlkEPe3c3whD2blQhl2YOT2OBslXqDiQpqgVm1yNkQ38gwEiveES', 'Carlos', 'Gutierrez', '37892101', '3454126434', 'acer28arg@gmail.com', 'Umberto Primo 218', '1992-06-04'),
(2, 'Alumno', 'Silica', '$2a$12$qCaP1EIODSM6GEqyKboM6OOk8y9LJFunRZehM0ReE8rph1ad8/H0m', 'Valentina Rocío', 'Burruchaga', '43882190', '3454114589', 'valenrobu@outlook.com.ar', 'Bolivia 82', '2000-12-08'),
(3, 'Tecnico', 'liomessi10', '$2a$12$HsSoSh9jbvoAa/tcIqRUcOmJHICgPcZ4nEdKJu1bMLx0d5KZe9C8S', 'Leandro', 'Correa', '39882178', '3454216801', 'leandro10correa@yahoo.com', 'San Lorenzo Oeste 1184', '1990-04-16'),
(4, 'Profesor', 'irmaferdez78', '$2a$12$qHVMCEcv/hmFFPDITjBlaOY9Xn4JbL5XcRUNRnguyxGYCT2BuZGmC', 'Irma', 'Yañez', '27002810', '3454115505', 'irmaferdez78@gmail.com', 'Irigoyen 123', '1978-10-30'),
(5, 'Profesor', 'juan1manuel', '$2a$12$mHNO/sKXD/w5DUa8pTW4e.dDTLNDxp0xi/RV2k./Ib2u9pfmFvZsu', 'Juan Manuel', 'Lerner', '36633199', '3454130974', 'juanmaoverflow@hotmail.com', 'Buenos Aires 261', '1984-08-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_curso`
--

CREATE TABLE `usuario_has_curso` (
  `Usuario_idUsuario` int(11) NOT NULL,
  `Curso_idCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario_has_curso`
--

INSERT INTO `usuario_has_curso` (`Usuario_idUsuario`, `Curso_idCurso`) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`),
  ADD KEY `fk_Curso_Categoria1_idx` (`Categoria_idCategoria`);

--
-- Indices de la tabla `curso_has_rutina`
--
ALTER TABLE `curso_has_rutina`
  ADD PRIMARY KEY (`Curso_idCurso`,`Rutina_idRutina`),
  ADD KEY `fk_Curso_has_Rutina_Rutina1_idx` (`Rutina_idRutina`),
  ADD KEY `fk_Curso_has_Rutina_Curso1_idx` (`Curso_idCurso`);

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`idEjercicio`);

--
-- Indices de la tabla `ejercicio_rutina`
--
ALTER TABLE `ejercicio_rutina`
  ADD PRIMARY KEY (`idEjercicio`,`idRutina`),
  ADD KEY `fk_Ejercicio_has_Rutina_Rutina1_idx` (`idRutina`),
  ADD KEY `fk_Ejercicio_has_Rutina_Ejercicio1_idx` (`idEjercicio`);

--
-- Indices de la tabla `elemento_ejercicio`
--
ALTER TABLE `elemento_ejercicio`
  ADD PRIMARY KEY (`idElemento_Trabajo`,`idEjercicio`),
  ADD KEY `fk_ElementoTrabajo_has_Ejercicio_Ejercicio1_idx` (`idEjercicio`),
  ADD KEY `fk_ElementoTrabajo_has_Ejercicio_ElementoTrabajo1_idx` (`idElemento_Trabajo`);

--
-- Indices de la tabla `elemento_trabajo`
--
ALTER TABLE `elemento_trabajo`
  ADD PRIMARY KEY (`idElemento_Trabajo`),
  ADD KEY `fk_ElementoTrabajo_TipoElemento1_idx` (`idTipo_Elemento`);

--
-- Indices de la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`idRutina`),
  ADD KEY `fk_Rutina_Categoria1_idx` (`idCategoria`);

--
-- Indices de la tabla `tipo_elemento`
--
ALTER TABLE `tipo_elemento`
  ADD PRIMARY KEY (`idTipo_Elemento`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `usuario_has_curso`
--
ALTER TABLE `usuario_has_curso`
  ADD PRIMARY KEY (`Usuario_idUsuario`,`Curso_idCurso`),
  ADD KEY `fk_Usuario_has_Curso_Curso1_idx` (`Curso_idCurso`),
  ADD KEY `fk_Usuario_has_Curso_Usuario1_idx` (`Usuario_idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `idEjercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `elemento_trabajo`
--
ALTER TABLE `elemento_trabajo`
  MODIFY `idElemento_Trabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rutina`
--
ALTER TABLE `rutina`
  MODIFY `idRutina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tipo_elemento`
--
ALTER TABLE `tipo_elemento`
  MODIFY `idTipo_Elemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `fk_Curso_Categoria1` FOREIGN KEY (`Categoria_idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `curso_has_rutina`
--
ALTER TABLE `curso_has_rutina`
  ADD CONSTRAINT `fk_Curso_has_Rutina_Curso1` FOREIGN KEY (`Curso_idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Curso_has_Rutina_Rutina1` FOREIGN KEY (`Rutina_idRutina`) REFERENCES `rutina` (`idRutina`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ejercicio_rutina`
--
ALTER TABLE `ejercicio_rutina`
  ADD CONSTRAINT `fk_Ejercicio_has_Rutina_Ejercicio1` FOREIGN KEY (`idEjercicio`) REFERENCES `ejercicio` (`idEjercicio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Ejercicio_has_Rutina_Rutina1` FOREIGN KEY (`idRutina`) REFERENCES `rutina` (`idRutina`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `elemento_ejercicio`
--
ALTER TABLE `elemento_ejercicio`
  ADD CONSTRAINT `fk_ElementoTrabajo_has_Ejercicio_Ejercicio1` FOREIGN KEY (`idEjercicio`) REFERENCES `ejercicio` (`idEjercicio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ElementoTrabajo_has_Ejercicio_ElementoTrabajo1` FOREIGN KEY (`idElemento_Trabajo`) REFERENCES `elemento_trabajo` (`idElemento_Trabajo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `elemento_trabajo`
--
ALTER TABLE `elemento_trabajo`
  ADD CONSTRAINT `fk_ElementoTrabajo_TipoElemento1` FOREIGN KEY (`idTipo_Elemento`) REFERENCES `tipo_elemento` (`idTipo_Elemento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD CONSTRAINT `fk_Rutina_Categoria1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_has_curso`
--
ALTER TABLE `usuario_has_curso`
  ADD CONSTRAINT `fk_Usuario_has_Curso_Curso1` FOREIGN KEY (`Curso_idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuario_has_Curso_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
