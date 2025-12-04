import { useEffect } from "react";
import React, { useState } from "react"



export default function Movie(){


    const [movies,setMovies]=useState([]);

    
  const OMDB_KEY = process.env.IMDB;

    useEffect(()=>{
                    fetch(`https://www.omdbapi.com/?s=batman&apikey=${OMDB_KEY}`)
                        .then(res=>res.json())
                        .then(data=>setMovies(data));
                },
                [OMDB_KEY]
            )

    return(
        <div>
            <h1>OMDb Test</h1>
            
            <ul>
            {
                movies.map(movie=>(
                    <li key={movie.id}>{movie.name}</li>
                )
                        )
            }
        </ul>
         </div>
    )
}