import { users, products, listaDeUsuarios, createUser } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors'
import {Tusers, Tproducts } from './types'
import { create } from "domain";


// console.table(users);
// console.table( products);
// console.log(listaDeUsuarios);


const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pegar todos os cursos aqui')
})

app.get('/users', (req: Request, res: Response) => {
    const resultUsers: Tusers[] = users
    res.status(200).send(resultUsers)
})
app.get('/products', (req: Request, res: Response) => {
    const resultProducts: Tproducts[] = products 
    res.status(200).send(resultProducts)
})


// app.get('search/products', (req: Request, res: Response) => {
//     const q: string = req.query.q as string;
//     const resultProducts: Tproducts[] = products

//     const searchProductsByName: Tproducts[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
    
// })

// Refatorar o GET /products

app.get('/products', (req: Request, res: Response) => {
    const q: string = req.query.q as string;
    const resultProducts: Tproducts[] = products

    if (!q) {
        return res.status(200).send(resultProducts)

    } else {
        const searchProductsByName: Tproducts[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
        return res.status(200).send(searchProductsByName)
    }
    
})
// III Exercicio

app.post('/users', (req: Request, res: Response) => {

    const {id, name, email, password} = req.body
    const newUser = createUser(id, name, email, password)

    res.status(201).send(newUser)
})

app.post('/products', (req: Request, res: Response) => {
    const {id, name, price, description, imageUrl} = req.body
    const newProduct: Tproducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)
    res.status(201).send(`O produto ${name} foi cadastrado com sucesso`)
    
}) 

//Exercícios - Aprofundamento Express
// Exercício 1 - Delete User by id

app.delete("/users/:id", (req: Request, res: Response)=> {
    const id = req.params.id
    const indexToDelete = users.findIndex((user) => user.id === id)

    if (indexToDelete !== -1) {
        users.splice(indexToDelete, 1)

    } else {
        console.log("Deu ruim, não deletou nada")
    }
    res.status(200).send({message: "User apagado com sucesso"})
})

// Exercício 2 - Delete Product by id

app.delete("/products/:id", (req: Request, res: Response)=> {
    const id = req.params.id
    const indexToDelete = products.findIndex((product) => product.id === id)
    // console.log("oiii", indexToDelete  )

    if (indexToDelete !== -1) {
        products.splice(indexToDelete, 1)

    } else {
        console.log("Deu ruim, não deletou nada")
    }
    res.status(200).send({message: "Produto apagado com sucesso"})
})

// Exercício 3 - Edit Product by id

app.put("/products/:id", (req, res) => {
    const id = req.params.id;
   
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;


    const product = products.find(product => product.id === id);

    if (!product) {
        // Se o produto não foi encontrado, retorne um erro 404
        return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Atualize os campos do produto, se houver novos valores
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
    
    res.json({ message: "Produto atualizado com sucesso"});
});
