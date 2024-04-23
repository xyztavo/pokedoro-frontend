import pokemonCardList from "@/components/pokemon-card-list";
import { getUser, checkUser } from "@/lib/auth/userAuth"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import { Loader } from "./ui/custom/loader";

export default function UserPokemons() {
    const [searchPageParams, setSearchPageParams] = useSearchParams()

    const page = useMemo(() => searchPageParams.get("page"), [searchPageParams])

    useEffect(() => {
        if (!page) {
            setSearchPageParams({ page: '1' })
        }
    })

    const alteredPage = Number(page) - 1
    const [pokemonQuery, setPokemonQuery] = useState('')
    const [isPokemonQuery, setIsPokemonQuery] = useState(false)



    function handlePokemonQuery() {
        const pageCasted = 1
        setSearchPageParams({ page: pageCasted.toLocaleString() })
        setIsPokemonQuery(prev => !prev)
    }

    function handlePage(page: string) {
        if (Number(page) <= 1) return

        setSearchPageParams({ page: page })
    }

    function handleNextPage() {
        if (Number(page) >= data?.data.user.totalPages) return
        const pageCasted = Number(page) + 1
        setSearchPageParams({ page: pageCasted.toLocaleString() })
    }

    function handlePreviousPage() {
        if (Number(page) <= 1) return
        const pageCasted = Number(page) - 1
        setSearchPageParams({ page: pageCasted.toLocaleString() })
    }


    const token = localStorage.getItem("auth");
    const { data, isLoading, isError, isPending, isFetching } = useQuery({
        queryKey: ['pokemonspokedex', isPokemonQuery, page], queryFn: async () => {
            const response = await axios.get(`https://pokedoro-backend.onrender.com/user/${userData.id}?pageIndex=${page ? alteredPage : 0}&pokemonQ=${pokemonQuery}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return response
        },
        enabled: checkUser()
    })
    const userData = getUser()

    return (
            <div className="font-pixel text-[12px]">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-8">
                        <h1 className="font-semibold text-center text-lg my-4">{userData.name} pokemons:</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            handlePokemonQuery()
                        }} className="flex flex-row gap-2">
                            <Input placeholder={'Search for a pokemon'} onChange={(e) => setPokemonQuery(e.target.value)} />
                            <Button variant={'outline'} className=' w-[40px] h-[40px]' type="submit"><Search className="scale-[3.5]" /></Button>
                        </form>
                    </div>
                    {isLoading || isPending || isFetching ? <Loader /> :
                        isError ? <p>No pokemons found</p> :
                            data?.data.user.pokemons.length < 1 ? <div className="flex flex-col">You got no pokemons :C</div> :
                                (data &&
                                    <div className="space-y-8">
                                        <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                                            {pokemonCardList(data.data.user.pokemons)}
                                        </div>
                                        <Pagination className="scale-75 md:scale-100">
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious href="#" onClick={() => handlePreviousPage()} />
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink href="#" onClick={() => handlePreviousPage()}>{Number(page) - 1}</PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink href="#" isActive>
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink href="#" onClick={() => handleNextPage()}>{Number(page) + 1}</PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <Button className="flex flex-row items-center" size={'sm'} variant={'ghost'} onClick={() => handlePage(data.data.user.totalPages)}>
                                                        <PaginationEllipsis />
                                                        <h1>{data.data.user.totalPages}</h1>
                                                    </Button>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationNext href="#" onClick={() => { handleNextPage() }} />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )
                    }
                </div>
    )
}