export type TPokemonArray = {
   pokemons: TPokemon[],
}
export type TPokemon = {
    id: number,
    name: string,
    type_list: TType[]
}
export type TType = {
    type: string,
}
