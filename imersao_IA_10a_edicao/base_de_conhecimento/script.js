const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("#search-input"); // Adicionado para a busca
let dados = [];

async function iniciarBusca() {
    if (dados.length !== 0) {
        cardContainer.innerHTML = ""; // Limpa o container antes de renderizar os novos cards
    }

    try {
        const resposta = await fetch("./data.json");
        dados = await resposta.json();
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        cardContainer.innerHTML = "<p style='text-align: center;'>Ops! Houve algum erro ao realizarmos sua pesquisa.</p>";
        return;
    }
    

    if (searchInput.value == "") {
        rederizarCards(dados);
    } else {
        dadosFiltrados = handleSearch();
        
        if (dadosFiltrados.length === 0) {
            cardContainer.innerHTML = "<p style='text-align: center;'>Nenhum resultado encontrado.</p>";
            return;
        }

        rederizarCards(dadosFiltrados);
    }
        
}

function handleSearch() {
    const termoBuscado = searchInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => {
        return dado.name.toLowerCase().includes(termoBuscado) ||
               dado.description.toLowerCase().includes(termoBuscado) ||
               dado.year.toLowerCase().includes(termoBuscado) ||
               dado.tags.some(tag => tag.toLowerCase().includes(termoBuscado));
    });

    return dadosFiltrados;
}

function rederizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar os novos cards
    
    for (let dado of cardsParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.name}</h2>
            <p>${dado.year}</p>
            <p>${dado.description}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
            `;
        cardContainer.appendChild(article);
    }
}

iniciarBusca()
