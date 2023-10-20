import { users, products, listaDeUsuarios, createUser } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { Tusers, Tproducts } from "./types";
import { create } from "domain";
import { db } from './database/knex'


// console.table(users);
// console.table( products);
// console.log(listaDeUsuarios);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pegar todos os cursos aqui");
});

// app.get('/users', (req: Request, res: Response) => {
//     const resultUsers: Tusers[] = users
//     res.status(200).send(resultUsers)
// })

// app.get('/products', (req: Request, res: Response) => {
//     const resultProducts: Tproducts[] = products
//     res.status(200).send(resultProducts)
// })
// app.get("/users", (req: Request, res: Response): void => {
//   try {
//     const resultUsers: Tusers[] = users;
//     res.status(200).send(resultUsers);
//   } catch (error) {
//     res.status(500).send({ error: "Erro ao buscar usuários." });
//   }
// });

// app.get("/products", (req: Request, res: Response): void => {
//   try {
//     const resultProducts: Tproducts[] = products;
//     res.status(200).send(resultProducts);
//   } catch (error) {
//     res.status(500).send({ error: "Erro ao buscar produtos." });
//   }
// });

// app.get('search/products', (req: Request, res: Response) => {
//     const q: string = req.query.q as string;
//     const resultProducts: Tproducts[] = products

//     const searchProductsByName: Tproducts[] = products.filter(product => 
//       product.name.toLowerCase().includes(q.toLowerCase()))

// })

// Refatorar o GET /products

// app.get("/products", (req: Request, res: Response) => {
//   const q: string = req.query.q as string;
//   const resultProducts: Tproducts[] = products;

//   if (!q) {
//     return res.status(200).send(resultProducts);
//   } else {
//     const searchProductsByName: Tproducts[] = products.filter((product) =>
//       product.name.toLowerCase().includes(q.toLowerCase())
//     );
//     return res.status(200).send(searchProductsByName);
//   }
// });
// III Exercicio

// app.post("/users", (req: Request, res: Response) => {
//   const { id, name, email, password } = req.body;
//   const newUser = createUser(id, name, email, password);

//   res.status(201).send(newUser);
// });

// app.post("/products", (req: Request, res: Response) => {
//   const { id, name, price, description, imageUrl } = req.body;
//   const newProduct: Tproducts = {
//     id,
//     name,
//     price,
//     description,
//     imageUrl,
//   };

//   products.push(newProduct);
//   res.status(201).send(`O produto ${name} foi cadastrado com sucesso`);
// });

//Exercícios - Aprofundamento Express
// Exercício 1 - Delete User by id

// app.delete("/users/:id", (req: Request, res: Response) => {
//   const id = req.params.id;
//   const indexToDelete = users.findIndex((user) => user.id === id);

//   if (indexToDelete !== -1) {
//     users.splice(indexToDelete, 1);
//   } else {
//     console.log("Deu ruim, não deletou nada");
//   }
//   res.status(200).send({ message: "User apagado com sucesso" });
// });

// Exercício 2 - Delete Product by id

// app.delete("/products/:id", (req: Request, res: Response) => {
//   const id = req.params.id;
//   const indexToDelete = products.findIndex((product) => product.id === id);
//   // console.log("oiii", indexToDelete  )

//   if (indexToDelete !== -1) {
//     products.splice(indexToDelete, 1);
//   } else {
//     console.log("Deu ruim, não deletou nada");
//   }
//   res.status(200).send({ message: "Produto apagado com sucesso" });
// });

// Exercício 3 - Edit Product by id

// app.put("/products/:id", (req, res) => {
//   const id = req.params.id;

//   const newName = req.body.name as string | undefined;
//   const newPrice = req.body.price as number | undefined;
//   const newDescription = req.body.description as string | undefined;
//   const newImageUrl = req.body.imageUrl as string | undefined;

//   const product = products.find((product) => product.id === id);

//   if (!product) {

//     return res.status(404).json({ error: "Produto não encontrado" });
//   }
//   if (newName !== undefined) {
//     product.name = newName;
//   }
//   if (newPrice !== undefined) {
//     product.price = newPrice;
//   }
//   if (newDescription !== undefined) {
//     product.description = newDescription;
//   }
//   if (newImageUrl !== undefined) {
//     product.imageUrl = newImageUrl;
//   }
//   res.json({ message: "Produto atualizado com sucesso" });
// });

// Exercícios - Fluxo de dados no Backend
// Exercício 1-  Get All Users

// app.get("/users/:id", (req: Request, res: Response): void => {
//   try {
//     const id: string = req.params.id;

//     const result: Tusers | undefined = users.find((user) => user.id === id);
//     if (!result) {
//       res.status(404).send("Conta não encontrada. Verifique a 'id'.");
//       return;
//     }
//     res.status(200).send(result);
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });

//  Get All Products

// app.get("/products", (req: Request, res: Response) => {
//   try {
//     const query = req.query.q as string | undefined;
//     if (query) {
//       if (query.length < 1) {
//         throw new Error("");
//       }
//       const result: Tproducts[] = products.filter(
//         (Product) => Product.name.toLowerCase() === query.toLowerCase()
//       );
//       res.status(200).send(result);
//     } else {
//       res.status(200).send(products);
//     }
//   } catch (error) {
//     console.log(error);
//     if (error instanceof Error) {
//       res.statusCode = 404;
//       res.send(error.message);
//     }
//   }
// });
//   Create User
// validar o body
// extra:
// não deve ser possível criar mais de uma conta com a mesma id
// não deve ser possível criar mais de uma conta com o mesmo e-mail

// app.post("/users", (req: Request, res: Response): void => {
//   try {
//     const { id, name, email, password, createdAt }: Tusers = req.body;

//     if (!id) {
//       res.statusCode = 404;
//       throw new Error(`O campo do 'id' é obrigatório`);
//     }
//     if (!name) {
//       res.statusCode = 404;
//       throw new Error(`O campo 'nome' é obrigatório`);
//     }

//     if (!email || !email.includes("@")) {
//       res.statusCode = 404;
//       throw new Error(`O campo 'email' deve ser um endereço de e-mail válido.`);
//     }
//     if (typeof password !== "number" || password <= 6) {
//       res.statusCode = 404;
//       throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
//     }
//     if (!createdAt || isNaN(Date.parse(createdAt))) {
//       res.statusCode = 404;
//       throw new Error(
//         `O campo 'createdAt' deve ser uma data válida no formato IS08601.`
//       );
//     }
//     res.status(200).json({ message: "Usuário criado com sucesso!" });
//   } catch (error: any) {
//     res.statusCode = 404;
//     res.send(error.message);
//   }
// });

    //   Create Produtos

// app.post("/products", (req: Request, res: Response) => {
//   try {
//     const { id, name, price, description, imageUrl } = req.body;

//     if (!id) {
//       res.status(400).json({ error: "O campo 'id' é obrigatório" });
//       return;
//     }
//     if (!name) {
//       res.status(400).json({ error: "O campo 'nome' é obrigatório" });
//       return;
//     }
//     if (typeof price !== "number" || isNaN(price)) {
//       res
//         .status(400)
//         .json({ error: "O campo 'price' deve ser um número obrigatório" });
//       return;
//     }
//     if (typeof description !== "string" || description.length < 6) {
//       res.status(400).json({
//         error: "O campo 'description' deve ter pelo menos 6 caracteres.",
//       });
//       return;
//     }
//     if (!imageUrl || !isValidImageUrl(imageUrl)) {
//       res.status(400).json({
//         error: "O campo 'imageUrl' deve ser uma URL válida para uma imagem.",
//       });
//       return;
//     }
//     res.status(200).json({ message: "Produto criado com sucesso!" });
//   } catch (error) {
//     res.status(500).json({ error: "Erro interno do servidor" });
//   }
// });
// function isValidImageUrl(url: any) {
//   return true;
// }

// Exercicios 2
// Delete User by id

// app.delete("/users/:id", (req: Request, res: Response): void => {
//   try {
//     const id: string = req.params.id;
    
//     if (id[0] !== "u") {
//       res.statusCode = 400;
//       throw new Error("'id' inválido. Deve iniciar com a letra 'u'");
//     }
    
//     const userIndex: number = users.findIndex((user) => user.id === id);
//     if (userIndex >= 0) {
//       users.splice(userIndex, 1);
//       res.status(200).send("Usuário deletado com sucesso");
//     } else {     
//       res.status(404).send("Usuário não encontrado");
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).send(error.message);
//     } else {
//       res.status(500).send("Erro inesperado");
//     }
//   }
// });

//  Delete Product by id

// app.delete("/products/:id", (req: Request, res: Response): void => {
//   try {
//     const id = req.params.id;

//     const indexToDelete = products.findIndex((product) => product.id === id);

//     if (indexToDelete !== -1) {
//       products.splice(indexToDelete, 1);
//       res.status(200).send("Produto  deletado com sucesso");
//     } else {
//       res.status(404).send("Produto não encontrado");
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(500).send("Erro inesperado");
//     }
//   }
// });

      //Edit Product by id
// app.put("/products/:id", (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     const product = products.find((product) => product.id === id);
//     if (!product) {
//       res.statusCode = 404;
//       throw new Error(`Esse produto já existe`);
//     }
//     const newName = req.body.name as string | undefined;
//     const newPrice = req.body.price as number | undefined;
//     const newDescription = req.body.description as string | undefined;
//     const newImageUrl = req.body.imageUrl as string | undefined;

//     if (newName?.length === 0) {
//       res.statusCode = 404;
//       throw new Error("Novo produto deve ter mais de um  caracter");
//     }
//     if (newPrice !== undefined && newPrice <= 0) {
//       res.statusCode = 404;
//       throw new Error("Novo preço");
//     }
//     if (newDescription) {
//       product.description = newDescription;
//       res.statusCode = 404;
//       throw new Error("");
//     }
//     if (newImageUrl) {
//       product.imageUrl = newImageUrl;
//     }
//     res.json({ message: "Produto atualizado com sucesso", product });
//   } catch (error) {
   
//     console.error(error);
//     res.status(500).json({ error: "Ocorreu um errooooo interno" });
//   }
// });
// Exercício - Aprofundamento SQL
// Exercício 1
// Get All Users = retorna todas as pessoas cadastradas

// app.get('/users', (req: Request, res: Response) => {
//       const resultUsers: Tusers[] = users
//       res.status(200).send(resultUsers)
//   })

// Get All Products (funcionalidade 1) = retorna todos os produtos cadastrados

  // app.get('/products', (req: Request, res: Response) => {
  //     const resultProducts: Tproducts[] = products
  //     res.status(200).send(resultProducts)
  // })
  

  
  //  Exercícios - Introdução ao Knex

  //   Exercício - 1
  //  Get All Users

  app.get('/users', async (req: Request, res: Response) => {
    try {

        const result: Tusers[] = await db.raw(`SELECT * FROM users`)

        res.status(200).send(result)

  } catch (error) {     
      if (error instanceof Error) {
          res.send(error.message)
      }
  }
});

//  Get All Products - funcionalidade 1

app.get('/products', async (req: Request, res: Response) => {
  try {

      const result: Tproducts[] = await db.raw(`SELECT * FROM products`)

      res.status(200).send(result)

  } catch (error) {     
      if (error instanceof Error) {
          res.send(error.message)
      }
  }
});

//  Get All Products - funcionalidade 2 (está com erro )

app.get('/products/search', async (req: Request, res: Response) => {
  try {
   
    // Verifique se o parâmetro de consulta "name" foi fornecido
    const nameP = req.query.nameP as string;
    // console.log(nameP) 

    // Se o parâmetro "name" foi fornecido, ajuste a consulta SQL
    if (!nameP) {
      throw new Error('Informe o nome do produto')
    }
    const result = await db('products').whereLike('name',`%${nameP}%`);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

// Exercício 2
// Create user

app.post("/users", async (req, res) => {
  try {
    // Recebendo informações do corpo da solicitação
    const { id, name, email, password } = req.body;

    // Verificando se campos obrigatórios não estão vazios
    if (!id || !name || !email || !password) {
      res.status(400).json({ message: "Campos inválidos ou ausentes" });
      return;
    }

    // Verificando se a senha possui pelo menos 6 caracteres
    if (typeof password !== "string" || password.length < 6) {
      res.status(400).send({ message: "A senha deve ter pelo menos 6 caracteres." });
      return;
    }

    // Inserindo o novo usuário no banco de dados
    await db.raw(`INSERT INTO users (id, name, email, password)
	        VALUES ("${id}", "${name}", " ${email}", "${password}" )`)
      
    res.status(201).send({
      message: "Cadastro realizado com sucesso"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro inesperado" });
  }
});

// Create product

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

      // console.log(id, name, price, description, imageUrl)

    if (!id || !name || !description || !imageUrl) {
      res.status(400)
       throw new Error ("Campos inválidos ou ausentes" );
      
    }
      if (typeof price !== "number" ) {
        res
          .status(400)
          throw new Error ( "O campo 'price' deve ser um número obrigatório" );
      
      }
       
    // Inserindo o novo produto no banco de dados
    
    await db.raw(`INSERT INTO products ( id, name, price, description, image_url)
	        VALUES ("${id}", "${name}", " ${price}", "${description}", "${imageUrl}" )`)
      
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    console.error(error);
    
    res.status(500).send({ message: "Erro inesperado" });
  }
});


  // Exercício 2
  // Create purchase
     
    
app.post("/purchases", async (req, res) => {
  try {
    const { buyer, total_price , purchase_id, product_id, quantity, created_at } = req.body;

    console.log( purchase_id, product_id, quantity, total_price, buyer)

    if ( !purchase_id || !product_id || !quantity || !buyer|| !created_at) {
      return res.status(400).send("Campos inválidos ou ausentes");
    }

    if (typeof total_price !== "number" || isNaN(total_price) || total_price <= 0) {
      return res.status(400).send("O campo 'total_price' deve ser um número maior que zero.");
    }
    // Primeiro, insira os dados na tabela 'purchases'
    await db('purchases').insert({
      id: purchase_id,
      buyer: buyer,
      total_price: total_price,
      created_at: created_at
      
    })

    // Em seguida, insira os dados na tabela 'purchases_products'
    await db('purchases_products').insert({
      purchase_id: purchase_id,
      product_id:  product_id,
      quantity: quantity
    })

    return res.status(201).send("Pedido realizado com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erro inesperado" });
  }
});
  
  // Exercício 3
  // Edit product by id
// Edita um produto existente.

app.put("/products/:id", async (req, res) => {
  try {
      // console.log("entrou no put")
    
    const id = req.params.id;   
    const {newId, newName, newPrice, newDescription, newImageUrl} = req.body;
    const product = await db('products').where({id: id})

      // console.log(product)

    if (!product) {
      res.status(404).send({ error: "Produto não encontrado" });
      
    }  

    if (newName  && newName.length < 2) {
      res.status(400).send({ error: "O nome do produto deve ter pelo menos dois caracteres" });
    
    }

    if (newPrice !== undefined && newPrice <= 0) {
      res.status(400).send({ error: "O preço deve ser maior que zero" });
      return;
    }

    if (newDescription !== undefined) {
      // product.description = description;
    }

    if (newImageUrl !== undefined) {
      
    }

    // Atualize os campos no banco de dados (substitua esta parte com a lógica real do banco de dados)
    const [updatedProduct] = await db.raw(`SELECT * FROM products WHERE id = "${id}"`);
    if (updatedProduct) {
      await db("products")     
      .update({
        id: newId || updatedProduct.id,
        name: newName || updatedProduct.name,
        price: newPrice || updatedProduct.price,
        description:  newDescription || updatedProduct.description,
        image_url:  newImageUrl || updatedProduct.imageUrl,
      }).where("id", id);

    }
    res.status(200).send("Produto atualizado com sucesso");
  } catch (error) {
    console.log(error)
    res.status(500).send( "Erro inesperado" );
  }
});


// Delete purchase by id
// Deleta um pedido existente.

app.delete("/purchases/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;

    const [purchases] = await db("purchases").where({ id: idToDelete});

    if (!purchases) {
      res.status(404);
      throw new Error("Pedido não encontrado");
    }
    await db("purchases").del().where({ id: idToDelete});

    res.status(200).send({messagem: "Purchases deletado com sucesso"});         
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

app.delete("/purchases_products/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;

    const [purchases] = await db("purchases_products").where({ id: idToDelete});

    if (!purchases) {
      res.status(404);
      throw new Error("Pedido não encontrado");
    }
    await db("purchases_products").del().where({ id: idToDelete});

    res.status(200).send({messagem: "Purchases deletado com sucesso"});         
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

