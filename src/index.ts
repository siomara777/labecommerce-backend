import { users, products, listaDeUsuarios, createUser } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { Tusers, Tproducts } from "./types";
import { create } from "domain";

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

app.get("/products", (req: Request, res: Response): void => {
  try {
    const resultProducts: Tproducts[] = products;
    res.status(200).send(resultProducts);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar produtos." });
  }
});

// app.get('search/products', (req: Request, res: Response) => {
//     const q: string = req.query.q as string;
//     const resultProducts: Tproducts[] = products

//     const searchProductsByName: Tproducts[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))

// })

// Refatorar o GET /products

app.get("/products", (req: Request, res: Response) => {
  const q: string = req.query.q as string;
  const resultProducts: Tproducts[] = products;

  if (!q) {
    return res.status(200).send(resultProducts);
  } else {
    const searchProductsByName: Tproducts[] = products.filter((product) =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
    return res.status(200).send(searchProductsByName);
  }
});
// III Exercicio

app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;
  const newUser = createUser(id, name, email, password);

  res.status(201).send(newUser);
});

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl } = req.body;
  const newProduct: Tproducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);
  res.status(201).send(`O produto ${name} foi cadastrado com sucesso`);
});

//Exercícios - Aprofundamento Express
// Exercício 1 - Delete User by id

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = users.findIndex((user) => user.id === id);

  if (indexToDelete !== -1) {
    users.splice(indexToDelete, 1);
  } else {
    console.log("Deu ruim, não deletou nada");
  }
  res.status(200).send({ message: "User apagado com sucesso" });
});

// Exercício 2 - Delete Product by id

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexToDelete = products.findIndex((product) => product.id === id);
  // console.log("oiii", indexToDelete  )

  if (indexToDelete !== -1) {
    products.splice(indexToDelete, 1);
  } else {
    console.log("Deu ruim, não deletou nada");
  }
  res.status(200).send({ message: "Produto apagado com sucesso" });
});

// Exercício 3 - Edit Product by id

app.put("/products/:id", (req, res) => {
  const id = req.params.id;

  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;

  const product = products.find((product) => product.id === id);

  if (!product) {

    return res.status(404).json({ error: "Produto não encontrado" });
  }
  if (newName !== undefined) {
    product.name = newName;
  }
  if (newPrice !== undefined) {
    product.price = newPrice;
  }
  if (newDescription !== undefined) {
    product.description = newDescription;
  }
  if (newImageUrl !== undefined) {
    product.imageUrl = newImageUrl;
  }
  res.json({ message: "Produto atualizado com sucesso" });
});

// Exercícios - Fluxo de dados no Backend
// Exercício 1-  Get All Users

app.get("/users/:id", (req: Request, res: Response): void => {
  try {
    const id: string = req.params.id;

    const result: Tusers | undefined = users.find((user) => user.id === id);
    if (!result) {
      res.status(404).send("Conta não encontrada. Verifique a 'id'.");
      return;
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//  Get All Products

app.get("/products", (req: Request, res: Response) => {
  try {
    const query = req.query.q as string | undefined;
    if (query) {
      if (query.length < 1) {
        throw new Error("");
      }
      const result: Tproducts[] = products.filter(
        (Product) => Product.name.toLowerCase() === query.toLowerCase()
      );
      res.status(200).send(result);
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.statusCode = 404;
      res.send(error.message);
    }
  }
});
//   Create User
// validar o body
// extra:
// não deve ser possível criar mais de uma conta com a mesma id
// não deve ser possível criar mais de uma conta com o mesmo e-mail

app.post("/users", (req: Request, res: Response): void => {
  try {
    const { id, name, email, password, createdAt }: Tusers = req.body;

    if (!id) {
      res.statusCode = 404;
      throw new Error(`O campo do 'id' é obrigatório`);
    }
    if (!name) {
      res.statusCode = 404;
      throw new Error(`O campo 'nome' é obrigatório`);
    }

    if (!email || !email.includes("@")) {
      res.statusCode = 404;
      throw new Error(`O campo 'email' deve ser um endereço de e-mail válido.`);
    }
    if (typeof password !== "number" || password <= 6) {
      res.statusCode = 404;
      throw new Error(`O campo 'password' deve ter pelo menos 6 caracteres.`);
    }
    if (!createdAt || isNaN(Date.parse(createdAt))) {
      res.statusCode = 404;
      throw new Error(
        `O campo 'createdAt' deve ser uma data válida no formato IS08601.`
      );
    }
    res.status(200).json({ message: "Usuário criado com sucessoooooo!" });
  } catch (error: any) {
    res.statusCode = 404;
    res.send(error.message);
  }
});

    //   Create Produtos

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    if (!id) {
      res.status(400).json({ error: "O campo 'id' é obrigatório" });
      return;
    }
    if (!name) {
      res.status(400).json({ error: "O campo 'nome' é obrigatório" });
      return;
    }
    if (typeof price !== "number" || isNaN(price)) {
      res
        .status(400)
        .json({ error: "O campo 'price' deve ser um número obrigatório" });
      return;
    }
    if (typeof description !== "string" || description.length < 6) {
      res.status(400).json({
        error: "O campo 'description' deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    if (!imageUrl || !isValidImageUrl(imageUrl)) {
      res.status(400).json({
        error: "O campo 'imageUrl' deve ser uma URL válida para uma imagem.",
      });
      return;
    }
    res.status(200).json({ message: "Produto criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
function isValidImageUrl(url: any) {
  return true;
}

// Exercicios 2
// Delete User by id

app.delete("/users/:id", (req: Request, res: Response): void => {
  try {
    const id: string = req.params.id;
    
    if (id[0] !== "u") {
      res.statusCode = 400;
      throw new Error("'id' inválido. Deve iniciar com a letra 'u'");
    }
    
    const userIndex: number = users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      users.splice(userIndex, 1);
      res.status(200).send("Usuário deletado com sucesso");
    } else {     
      res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

//  Delete Product by id

app.delete("/products/:id", (req: Request, res: Response): void => {
  try {
    const id = req.params.id;

    const indexToDelete = products.findIndex((product) => product.id === id);

    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);
      res.status(200).send("Produto  deletado com sucesso");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro inesperado");
    }
  }
});

      //Edit Product by id
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const product = products.find((product) => product.id === id);
    if (!product) {
      res.statusCode = 404;
      throw new Error(`Esse produto já existe`);
    }
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    if (newName?.length === 0) {
      res.statusCode = 404;
      throw new Error("Novo produto deve ter mais de um  caracter");
    }
    if (newPrice !== undefined && newPrice <= 0) {
      res.statusCode = 404;
      throw new Error("Novo preço");
    }
    if (newDescription) {
      product.description = newDescription;
      res.statusCode = 404;
      throw new Error("");
    }
    if (newImageUrl) {
      product.imageUrl = newImageUrl;
    }
    res.json({ message: "Produto atualizado com sucesso", product });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ error: "Ocorreu um errooooo interno" });
  }
});
// Exercício - Aprofundamento SQL
// Exercício 1
// Get All Users = retorna todas as pessoas cadastradas

app.get('/users', (req: Request, res: Response) => {
      const resultUsers: Tusers[] = users
      res.status(200).send(resultUsers)
  })

// Get All Products (funcionalidade 1) = retorna todos os produtos cadastrados

  app.get('/products', (req: Request, res: Response) => {
      const resultProducts: Tproducts[] = products
      res.status(200).send(resultProducts)
  })
  

  // Get all Products (funcionalidade 2)
  // imagine um termo de busca, por exemplo "gamer"
  // retorna somente os produtos que possuem em seu nome o termo "gamer"