-- Active: 1695773949824@@127.0.0.1@3306


CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

SELECT * FROM users


INSERT INTO users(id,name,email,password)
VALUES('u001', 'Siomara', 'sil@gmail.com', '010101')

INSERT INTO users(id,name,email,password)
VALUES('u002', 'Reynaldo', 'rey@gmail.com', '020202'),
('u003', 'Iracema', 'cema@gmail.com', '030303'),
('u004', 'Iara', 'iara@gmail.com', '040404'),
('u005', 'Ronaldo', 'roni@gmail.com', '050505')


CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);
SELECT * FROM products

INSERT INTO products(id,name,price,description,image_url)
VALUES('p001', 'Tv LG',1999.00,'46 polegadas','https://unsplash.com/')

INSERT INTO products(id,name,price,description,image_url)
VALUES('p002', 'Iphone 13', 4299.00,'128bg', 'https://images.unsplash.com/'),
('p003', 'Geladeira', 1999.99,'Frost Free', 'https://images.unsplash.com/' ),

INSERT INTO products(id,name,price,description,image_url)
VALUES('p004', 'Som LG', 2999.00,'AM e FM','https://unsplash.com/')

INSERT INTO products(id,name,price,description,image_url)
VALUES('p005', 'Cama de solteiro', 1500.00, 'DarCasa-Marca', 'https://unsplash.com/')
