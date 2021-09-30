import * as React from "react";
import { PokemonItem } from "./PokemonItem"
import { Pokedata } from "./Pokedata"

export default function Pokemons(props) {

    return (
        <div className='mb-8'>
          <div>
            <h1 className='text-6xl mb-4 font-extrabold'>Pokemons</h1>
            <p>These are the pokemons that we are taking care of.</p>
            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' id='pokemon-list'>
                {Pokedata.map((pokemon) => (
                    <PokemonItem
                        name={pokemon.name.english}
                        image={pokemon.image}
                        description={pokemon.description}
                        key={pokemon.id}
                    />
                ))}
            </ul>
          </div>
        </div>
    )
}