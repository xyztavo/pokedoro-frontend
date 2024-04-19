import { Button, buttonVariants } from "@/components/ui/button"
import checkTypeReturnIcon from "@/lib/utils/checkTypeReturnIcon"
import { TPokemon } from "@/types/Pokemons"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export function Home() {
    // Queries
    const { data, isLoading } = useQuery({
        queryKey: ['pokemons'], queryFn: async () => {
            const response = await fetch('https://pokedoro-backend.onrender.com/pokemon')
            return await response.json()
        }
    })


    return (
        <div className="font-pixel text-[12px] flex flex-col items-center justify-center space-y-4">
            <div>
                <h1 className="font-semibold text-center text-3xl my-4"><Link to={'/login'} className={buttonVariants({ variant: "link" })} >Start your journey now!</Link></h1>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center gap-4 p-2">

                {isLoading ? <div>loading...</div> : data.pokemons.map((pokemon: TPokemon) =>
                    <div className="border rounded-md" key={pokemon.id}>
                        <div className="flex border-b justify-center items-center">
                            {pokemon.type_list.map((typeObj) => {
                                return checkTypeReturnIcon(typeObj.type)
                            }
                            )}</div>
                        <div className="flex rounded-md w-40 h-40 items-center justify-center box-border border-b">
                            <img src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${pokemon.id}.gif`} className="max-w-full max-h-full" />
                        </div>
                        <h1 className="text-center p-2">{pokemon.name}</h1>
                    </div>
                )}
            </div>
            <Button variant={"outline"} asChild>
                <Link to={'/pokedex'}>Check Full Pokedex</Link>
            </Button>
        </div>
    )
}