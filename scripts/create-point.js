
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    
    const i = event.target.selectedIndex
    stateInput.value = event.target.options[i].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade:</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false

    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
//pegar os <li>
const itemsToColect = document.querySelectorAll(".items-grid li")

for (item of itemsToColect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover a classe na tag
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar se existem itens selecionados
    //se sim, pegar os selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //return tue or false
        return itemFound
    })

    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{ //se não, adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o input escondido com os dados selecionados
    collectedItems.value = selectedItems
}