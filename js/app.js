console.log("conectado...")
const lista = document.getElementById('lista')
const infoPokemon = document.getElementById('infoPokemon').content
const fragment = document.createDocumentFragment()

//Elementos del filtro

const btnFiltrar = document.getElementById('btnFiltrar')
const input = document.getElementById('filtroPokemones')


let pokemones = []
let pokemonBuscado = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemones()
})

btnFiltrar.addEventListener('click', () => {
    if(input.value > 0 && input.value){
        console.log('click en el filtro', input.value)
        fetchPokemones(input.value)
    }
})

lista.addEventListener('click', e => {
    if(e.target.classList.contains('btn-dark')){
        const id = e.target.dataset.id
        fetchPokemonBuscado(id)
        console.log('id', id)
    }
     
})

const fetchPokemonBuscado = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then( async(res) => {
        //console.log(await res.json())
        pokemonBuscado = await res.json()
        const pokemon = {
            nombre: pokemonBuscado.name,
            experiencia: pokemonBuscado.base_experience,
            hp: pokemonBuscado.stats[0].base_stat,
            ataque: pokemonBuscado.stats[1].base_stat,
            defensa: pokemonBuscado.stats[2].base_stat,
            especial: pokemonBuscado.stats[3].base_stat,
            imgJuego: pokemonBuscado.sprites.front_default,
            imgCvg: pokemonBuscado.sprites.other.dream_world.front_default,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonBuscado.id}.png`
        }
        pintarPokemon(pokemon)
        //console.log('pokemon', pokemon)
    })
    .catch( error => {
        console.log(error)
    })
}

const pintarPokemon = pokemon => {
    const pokemonBuscado = document.getElementById('pokemonBuscado')
    const template = document.getElementById('card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()
    pokemonBuscado.innerHTML = ''
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgCvg)

    fragment.appendChild(clone)
    pokemonBuscado.appendChild(fragment)
}

const fetchPokemones = (total) => {
    const limit = total || 2000
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then (async(res) => {
            pokemones = []
            //console.log('res', await res.json())
            let data = await res.json()
            pokemones = await data.results
            //console.log('pokemones', pokemones)
            pintarPokemones()
        })
        .catch (error => {
            console.log('error', error)
        })
}

const pintarPokemones = () => {
    lista.innerHTML = ''
    pokemones.forEach((item, index) => {
        //console.log(item)
        infoPokemon.querySelectorAll('p')[0].textContent = item.name
        infoPokemon.querySelectorAll('p')[1].textContent = item.url
        infoPokemon.querySelector('button').dataset.id = index + 1

        const clone = infoPokemon.cloneNode(true)
        fragment.appendChild(clone)
    })
    lista.appendChild(fragment)

}