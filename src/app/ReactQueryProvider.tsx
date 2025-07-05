"use client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { useState } from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

export default function ReactQueryProvider({children}: {children: React.ReactNode}){
    const [query] = useState(new QueryClient());

    return <QueryClientProvider client={query}>
        {children}
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
}