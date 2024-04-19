import checkTypeReturnIcon from "@/lib/utils/checkTypeReturnIcon"
import { TPokemon } from "@/types/Pokemons"

export default function pokemonCardList(pokemonsArray) {
    return pokemonsArray.map((pokemon: TPokemon) =>
        <div className="border rounded-md" key={pokemon.id}>
            <div className="flex border-b justify-center items-center">
                {pokemon.type_list.map((typeObj, index) => {
                    return <div key={index}>{checkTypeReturnIcon(typeObj.type)}</div>
                }
                )}</div>
            <div className="flex rounded-md w-40 h-40 items-center justify-center box-border border-b">
                <img src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pokemon.id}.gif`} className="max-w-full max-h-full" />
            </div>
            <h1 className="text-center p-2">{pokemon.name}</h1>
        </div>
    )
}