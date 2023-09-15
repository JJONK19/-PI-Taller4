-- Eliminar tablas
DROP TABLE IF EXISTS curso, usuario, catedratico, cursoAprobado, cursoImpartido, publicacion, comentario;

-- Tabla Curso
CREATE TABLE IF NOT EXISTS curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    creditos INT NOT NULL
); 

-- Tabla Usuario
CREATE TABLE IF NOT EXISTS usuario (
    registro VARCHAR(10) PRIMARY KEY,
    nombres VARCHAR (20) NOT NULL,
    apellidos VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    correo  VARCHAR(40) NOT NULL,
    creditos INT DEFAULT 0
);

-- Tabla Catedratico
CREATE TABLE IF NOT EXISTS catedratico (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(60) NOT NULL
);

-- Tabla Curso Aprobado
CREATE TABLE IF NOT EXISTS cursoAprobado (
  usuario VARCHAR(10),
  curso INT,
  PRIMARY KEY (usuario, curso), 
  FOREIGN KEY (usuario) REFERENCES usuario(registro),
  FOREIGN KEY (curso) REFERENCES curso(id)
);

-- Tabla Curso Impartido
CREATE TABLE IF NOT EXISTS cursoImpartido (
    curso INT,
    catedratico INT,
    seccion VARCHAR(5) NOT NULL, 
    PRIMARY KEY (curso, catedratico), 
    FOREIGN KEY (curso) REFERENCES curso(id),
    FOREIGN KEY (catedratico) REFERENCES catedratico(id)
);

-- Tabla Publicacion
CREATE TABLE IF NOT EXISTS publicacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    mensaje VARCHAR(150) NOT NULL,
    usuario VARCHAR(10) NOT NULL,
    curso INT NOT NULL,
    catedratico INT NOT NULL,
    FOREIGN KEY (usuario) REFERENCES usuario(registro),
    FOREIGN KEY (curso, catedratico) REFERENCES cursoImpartido(curso, catedratico)
);

-- Tabla Comentario
CREATE TABLE IF NOT EXISTS comentario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    mensaje VARCHAR(150) NOT NULL,
    usuario VARCHAR(10) NOT NULL,
    publicacion INT NOT NULL,
    FOREIGN KEY (usuario) REFERENCES usuario(registro),
    FOREIGN KEY (publicacion) REFERENCES publicacion(id)
);


