-- Criação da tabela Empresa
CREATE TABLE Empresa (
id INT PRIMARY KEY IDENTITY(1,1),
nome VARCHAR(100) NOT NULL,
cnpj VARCHAR(14) NOT NULL,
dono varchar(100)
);

-- Criação da tabela Usuario
CREATE TABLE Usuario (
id INT PRIMARY KEY IDENTITY(1,1),
PID CHAR(6),
nome VARCHAR(50) NOT NULL,
sobrenome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(100) NOT NULL,
cargo VARCHAR(20) NOT NULL,
id_gestor int,
id_empresa INT NOT NULL,
FOREIGN KEY (id_gestor) REFERENCES Usuario (id),
FOREIGN KEY (id_empresa) REFERENCES Empresa (id)
);

create table log_uso(
id_maquina int,
id_empresa int,
id_usuario int,
data_log date,
horario_inicio time,
horario_final time,
foreign key(id_maquina) references Maquina(id),
foreign key(id_empresa) references Empresa(id),
foreign key(id_usuario) references Usuario(id)
);

-- Criação da tabela Maquina
CREATE TABLE Maquina (
id INT PRIMARY KEY IDENTITY(1,1),
sistema_operacional VARCHAR(50) NOT NULL,
modelo varchar(45),
ip varchar(15),
fabricante varchar(45),
id_empresa int,
foreign key (id_empresa) references empresa(id)
);

-- Criação da tabela Registros
CREATE TABLE Registros (
id int primary key IDENTITY(1,1),
momento datetime,
uso_cpu decimal(3,2) not null,
uso_ram decimal(3,2) not null,
ram_disponivel decimal(7,2) not null,
rede_download decimal(3,2) not null,
rede_upload decimal(3,1) not null,
disco_tempo_resposta decimal(7,2),
id_componente varchar(45)
);

CREATE TABLE Componente (
    nome_componente VARCHAR(45) PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    fabricante VARCHAR(45) NOT NULL,
    cpu_frequencia DECIMAL(8 , 2 ) NOT NULL,
    cpu_processos VARCHAR(45) NOT NULL,
    ram_qtd_armazenamento DECIMAL(5 , 2 ) NOT NULL,
    disco_serial VARCHAR(45) NOT NULL,
    disco_capacidade VARCHAR(45) NOT NULL,
    disco_velocidade_leitura VARCHAR(45) NOT NULL,
    disco_velocidade_gravacao VARCHAR(45) NOT NULL,
    disco_resposta VARCHAR(45) NOT NULL,
    id_maquina INT,
    id_empresa INT,
    FOREIGN KEY (id_maquina)
        REFERENCES Maquina (id),
    FOREIGN KEY (id_empresa)
        REFERENCES Empresa (id)
);