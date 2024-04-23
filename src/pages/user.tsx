import { Button } from "@/components/ui/button";
import UserPokemons from "@/components/user-pokemons";
import { getUser } from "@/lib/auth/userAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import checkTypeReturnIcon from "@/lib/utils/checkTypeReturnIcon";
import { TType } from "@/types/Pokemons";
import { Loader2 } from "lucide-react";

export default function User() {
    const token = localStorage.getItem('auth');
    const getRandomNumber = Math.floor(Math.random() * 650);
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
            queryClient.invalidateQueries({ queryKey: ['pokemonspokedex'] })
        }
    })

    return (
        <>
            <div className="space-y-4 mt-4">
                <h1 className="text-center">Account</h1>
                <Button disabled={isPending} onClick={() => {
                    mutateAddPokemon()
                }} className="flex flex-row m-auto justify-center gap-4" variant={'secondary'}>{isPending ? <><Loader2 className=" animate-spin" />Loading pokemon...</> : `Get me a random pokemon`}</Button>
            </div>
            {isSuccess &&
                <Dialog defaultOpen>
                    <DialogContent>
                        <div className="space-y-4 p-4">
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
                        </div>
                    </DialogContent>
                </Dialog>
            }
            {isError &&
                <Dialog defaultOpen>
                    <DialogContent>
                        <div className="space-y-4  p-4">
                            <DialogTitle className="text-center">No new pokemons were found.</DialogTitle>
                            <DialogDescription className="flex items-center justify-center flex-col space-y-4">
                                <img src={`https://raw.githubusercontent.com/wellrccity/pokedex-html-js/master/assets/img/pokemons/poke_1.gif`} />
                                <div className="flex items-center justify-center flex-row gap-4">
                                    Perhaps you should try again
                                </div>
                            </DialogDescription>
                        </div>
                    </DialogContent>
                </Dialog>
            }
            <UserPokemons />
        </>
    )
}