import { Button } from "@/components/ui/button";
import UserPokemons from "@/components/user-pokemons";
import { getUser } from "@/lib/auth/userAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import checkTypeReturnIcon from "@/lib/utils/checkTypeReturnIcon";
import { TType } from "@/types/Pokemons";
import { Loader2 } from "lucide-react";

export default function User() {
    const token = localStorage.getItem('auth');
    const getRandomNumber = Math.floor(Math.random() * 700);
    const queryClient = useQueryClient();
    const userData = getUser();

    const { mutate: mutateAddPokemon, data, isPending, isSuccess, isError } = useMutation({
        mutationFn: async () => {
            const response = await axios.put('https://pokedoro-backend.onrender.com/user/pokemon', { userId: userData.id, pokemonId: getRandomNumber }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        },
        onSuccess: () => {
            // pokemonspokedex
            queryClient.invalidateQueries({ queryKey: ['pokemonspokedex']})
        }
    })

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mt-4">Account</h1>
            {isSuccess &&
                <Dialog defaultOpen>
                    <DialogContent>
                        <DialogHeader className="space-y-4">
                            <DialogTitle className="text-center">{data.newPokemon.name} was found!</DialogTitle>
                            <DialogDescription className="flex items-center justify-center flex-col space-y-4">
                                <img src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_${data.newPokemon.id}.gif`} />
                                <div className="flex items-center justify-center flex-row gap-4">
                                    {data.newPokemon.type_list.map((typeObj: TType) => (
                                        <div className="flex items-center justify-center flex-row">
                                            <h2>{typeObj.type}</h2>
                                            {checkTypeReturnIcon(typeObj.type)}
                                        </div>
                                    ))}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            }
             {isError &&
                <Dialog defaultOpen>
                    <DialogContent>
                        <DialogHeader className="space-y-4">
                            <DialogTitle className="text-center">No new pokemons were found.</DialogTitle>
                            <DialogDescription className="flex items-center justify-center flex-col space-y-4">
                                <img src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_1.gif`} />
                                <div className="flex items-center justify-center flex-row gap-4">
                                    Perhaps you should try again
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            }
            <UserPokemons />
            <div className="flex flex-row">
            <Button disabled={isPending} onClick={() => {
                    mutateAddPokemon()
                }}>{isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading pokemon...</> : `Get me a random pokemon`}</Button>
            </div>
        </div>
    )
}