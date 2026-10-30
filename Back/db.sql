CREATE TABLE cargo (
    car_id SERIAL PRIMARY KEY,
    car_nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pessoa (
    pes_id SERIAL PRIMARY KEY,
    pes_nome VARCHAR(255)
);