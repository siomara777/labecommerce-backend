import { Tproducts, Tusers } from "./types";

export const users: Tusers[] = 
[

    {
        
        id: "u001",
        name: "Iracema",
        email: "cema@email.com",
        password: "cema1234",
        createdAt: new Date().toLocaleString(),
    },

    {
        id: "u002",
        name: "Reynaldo",
        email: "rey@email.com",
        password: "naldo12345",
        createdAt: new Date().toLocaleString(),

            
    },      

    {
        id: "u003",
        name: "Iara",
        email: "iara@email.com",
        password: "iara123456",
        createdAt: new Date().toLocaleString(),

            
    }    
]

export const products: Tproducts[] = 
[
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    },

        {
            id: "prod003",
            name: "Teclado gamer",
            price: 200,
            description: "Teclado mecânico com numpad",
            imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400"
        }


]
////Exercicio I
export function createUser(id: string, name:string, email:string, password:string): string {
    const createdAt: string = new Date().toISOString();
    const newUser:Tusers = {id, name,email, password, createdAt};
    users.push(newUser);
    return "Cadastro realizado com sucesso";
    
}

export function getAllUsers(): Tusers[] {
    return users;    
}

 export const listaDeUsuarios: Tusers[] = getAllUsers();
// console.log(listaDeUsuarios);


////Exercicio II
export function createProduct(id: string, name: string, price:number, description: string, imageUrl: string):string {
    const newProduct: Tproducts = {id, name, price, description, imageUrl};
    products.push(newProduct);
    return "Produto criado com sucesso";

}

export function getAllProducts() {
    return products;

}
////Exercicio III

export function searchProductsByName(name: string): Tproducts[] {
    name = name.toLowerCase();
    const matchingProducts = products.filter(product => product.name.toLowerCase().includes(name));
    return matchingProducts;


}



