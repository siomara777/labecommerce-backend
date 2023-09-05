const startGame = (chooseUser, Usernumber) => {
    // VERIFICAR SE TEMA ARGUMENTO 1 E 2:
    if (chooseUser !== 'par' || (chooseUser !== 'impar' && Usernumber < 0)) {
        console.log(
            'Por favor digite: "par" ou "impar" um  espaço e depois um numero qualquer'
        );
        return;
    }

    // SORTEIA UM NÚMERO:
    const drawnNumber = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    const total = drawnNumber + Number(Usernumber);

    // VERIFICA SE NÚMERO SORTEADO É PAR OU IMPAR: 
    const checkNumberDrawer = total % 2 === 0 ? 'par' : "impar";

    // VERIFICA SE COMPUTADOR FICOU COM PAR OU IMPAR:
    const chooseComputador = chooseUser === 'par' ? 'impar' : 'par';

    // VERIFICA E ANUENCIA VITÓRIA:
    checkNumberDrawer === chooseUser
        ? console.log(
            `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseComputador}, o resultado foi ${total}. Voçê ganhou!`
    ) 
        : console.log(
            `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseComputador}, o resultado foi ${total}. Voçê perdeu!`
    );
}

startGame(process.argv[2], process.argv[3]);
