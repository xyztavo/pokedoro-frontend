import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import pokemonCardList from "@/components/pokemon-card-list"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import axios from "axios"
import { Loader } from "@/components/ui/loader"

export function Pokedex() {
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
        if (Number(page) >= data?.data.totalPages) return
        const pageCasted = Number(page) + 1
        setSearchPageParams({ page: pageCasted.toLocaleString() })
    }

    function handlePreviousPage() {
        if (Number(page) <= 1) return
        const pageCasted = Number(page) - 1
        setSearchPageParams({ page: pageCasted.toLocaleString() })
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['pokemonspokedex', page, isPokemonQuery], queryFn: () => {
            const response = axios.get(`https://pokedoro-backend.onrender.com/pokemon?pageIndex=${page ? alteredPage : 0}&query=${pokemonQuery}`)
            return response
        }, refetchOnWindowFocus: false
    })

    return (
        <div className="text-[12px] space-y-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <h1 className="font-semibold text-center text-lg my-4">Pokedex</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handlePokemonQuery()
                }} className="flex flex-row gap-2">
                    <Input placeholder={'Search for a pokemon'} onChange={(e) => setPokemonQuery(e.target.value)} />
                    <Button variant={'outline'} className=' w-[40px] h-[40px]' type="submit"><Search className="scale-[3.5]" /></Button>
                </form>
            </div>
            {isLoading ? <Loader /> :
                isError ? <div>No pokemons found</div> :
                    data?.data.pokemons.length < 1 ? <div>no </div> :
                        (data &&
                            <div className="space-y-8">
                                <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                                    {pokemonCardList(data.data.pokemons)}
                                </div>
                                <Pagination>
                                    <PaginationContent className="scale-[0.7] md:scale-100">
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
                                            <Button className="flex flex-row items-center" size={'sm'} variant={'ghost'} onClick={() => handlePage(data.data.totalPages)}>
                                                <PaginationEllipsis />
                                                <h1>{data.data.totalPages}</h1>
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