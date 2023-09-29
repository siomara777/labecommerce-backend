-- Active: 1695773949824@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);
SELECT *
FROM users
INSERT INTO users(id, name, email, password)
VALUES('u001', 'Siomara', 'sil@gmail.com', '010101')
INSERT INTO users(id, name, email, password)
VALUES('u002', 'Reynaldo', 'rey@gmail.com', '020202'),
    ('u003', 'Iracema', 'cema@gmail.com', '030303'),
    ('u004', 'Iara', 'iara@gmail.com', '040404'),
    ('u005', 'Ronaldo', 'roni@gmail.com', '050505') CREATE TABLE products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );
SELECT *
FROM products
INSERT INTO products(id, name, price, description, image_url)
VALUES(
        'p001',
        'Tv LG',
        1999.00,
        '46 polegadas',
        'https://unsplash.com/'
    )
INSERT INTO products(id, name, price, description, image_url)
VALUES(
        'p002',
        'Iphone 13',
        4299.00,
        '128bg',
        'https://images.unsplash.com/'
    ),
    (
        'p003',
        'Geladeira',
        1999.99,
        'Frost Free',
        'https://images.unsplash.com/'
    ),
    INSERT INTO products(id, name, price, description, image_url)
VALUES(
        'p004',
        'Som LG',
        2999.00,
        'AM e FM',
        'https://unsplash.com/'
    )
INSERT INTO products(id, name, price, description, image_url)
VALUES(
        'p005',
        'Cama de solteiro',
        1500.00,
        'DarCasa-Marca',
        'https://unsplash.com/'
    );
-- Exercício - Aprofundamento SQL
-- Exercício 1
-- Get All Users = retorna todas as pessoas cadastradas

SELECT * FROM users;

-- Get All Products (funcionalidade 1) = retorna todos os produtos cadastrados

SELECT * FROM products;

--  Get all Products (funcionalidade 2)
--    imagine um termo de busca, por exemplo "gamer"
--   retorna somente os produtos que possuem em seu nome o termo "gamer"

SELECT * FROM products
WHERE name LIKE '%LG%';

-- Exercício - Aprofundamento SQL
-- Exercício 2
-- Create User -  cria uma nova pessoa na tabela users

INSERT INTO users(id, name, email, password)
VALUES('u008', 'Rey', 'reey@gmail.com', '080808');

-- Create Product - cria um novo produto na tabela products

INSERT INTO products(id, name, price, description, image_url)
VALUES(
        'p007',
        'Mesas',
        650.00,
        'Mesas de jantar',
        'https://unsplash.com/'
    );

--  Exercício - Aprofundamento SQL
-- Exercício 3
-- Delete User by id - deleção de user por id

DELETE FROM users
WHERE id = 'u007';

-- Delete Product by id - deleção de produto por id

DELETE FROM products
WHERE id = 'p007';

-- Edit Product by id - edição de produto por id
-- - faça a query editar todas as colunas do item

UPDATE products
SET name = 'Armário',
    price = 1600.00,
    description = 'Armário de canto',
    image_url = 'https://images.unsplash.com/'
WHERE ID = 'p006';