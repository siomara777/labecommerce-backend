const startGame = (chooseUser) => {
    // VERIFICAR SE O USUÁRIO DIGITOU UM DOS TRÊS ARGUMENTOS ACEITOS:
    if (
        chooseUser !== 'pedra' &&
        chooseUser !== 'papel' && 
        chooseUser !== 'tesoura' 
    ) {
        console.log('Por favor, digite "pedra", "papel" ou "tesoura"');
        return;
    }

    // SORTEAR A OPÇÃO DO COMPUTADOR:
    const options = ['pedra', 'papel', 'tesoura'];
    const randomIndex = Math.floor(Math.random() * options.length);
    const chooseCoputer = options[randomIndex];

    // ANALISANDO EMPATE:
    if (chooseUser === chooseCoputer) {
        console.log(
            `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Empate!`
        );
        return;        
    }

    // USUÁRIO PEDRA E COMPUTER PAPEL:
    if (chooseUser === 'pedra') {
        if (chooseCoputer === 'papel'){
            console.log(
                `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Voçê perdeu!`                
            );
            return;            
        }        
    // USUÁRIO PEDRA E COMPUTER TESOURA:
            console.log(
                `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Voçê ganhou!`  
            );
            return;

    // USUÁRIO PAPEL E COMPUTER TESOURA:  
    } else if (chooseUser === 'papel') {
        if (chooseCoputer === 'tesoura') {
            console.log(
                `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Voçê perdeu!`  
            );
            return;            
        }
    // USUÁRIO PAPEL E COMPUTER PEDRA:
            console.log(
                `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Voçê ganhou!`
            );
            return;            
        }

         // USUÁRIO TESOURA E COMPUTER PEDRA:
         if (chooseCoputer === 'pedra') {
            console.log(
                `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Voçê perdeu!`  
            );
            return;            
        }        
        // USUÁRIO TESOURA E COMPUTER PAPEL:
            console.log(
                `Voçê escolheu ${chooseUser} e o computador escolheu ${chooseCoputer}. Voçê ganhou!`
            );
            return;            
    };
    startGame(process.argv[2]);
    



