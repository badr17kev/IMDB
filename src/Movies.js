import { useEffect } from "react";
import React, { useState } from "react"
import { Link } from "react-router-dom";




export default function Movies(){


    const [movies,setMovies]=useState([]);
    const[inputValue,setInputValue]=useState("naruto");

//fetch("https://www.omdbapi.com/?s=         {inputValue}              &apikey=c43df2f0")
//"https://www.omdbapi.com/?s=batman&apikey=c43df2f0"

   /* useEffect(()=>{
                    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(inputValue)}&apikey=c43df2f0`)

                        .then(res=>res.json())
                        .then(data => setMovies(data.Search || []));

                },
                [inputValue]
            )
    */
            useEffect(() => {
                    if (!inputValue.trim()) {
                        setMovies([]);
                        return;
                    }

                    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(inputValue)}&apikey=c43df2f0`)
                            .then(res => res.json())
                            .then(data => setMovies(data.Search || []))
                            .catch(() => setMovies([]));
                    }, 
                    [inputValue]);



    return( 
        <div>

            <div className="navLeft">
                            <div className="brand">
                                <span className="logo">MovieBox</span>
                                
                            </div>
                            
            </div>

            
                                    <div className="navRight">
                                                                            <div className="searchWrap">
                                                <span className="searchIcon">🔍</span>   {/* add this */}
                                                <input
                                                    className="navInput"
                                                    type="text"
                                                    placeholder="Search movies..."
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                />
                                                {inputValue && (
                                                    <button className="clearBtn" onClick={() => setInputValue("")}>✕</button>
                                    )}
                </div>


                        <div className="resultBadge">
                                    {movies.length} results
                       </div>
            </div>
        
            
            
            <ul className="moviesGrid">

                {movies.map(movie => (
                    <li className="movieCard" key={movie.imdbID}>
                        <Link to={`/movies/${movie.imdbID}`}>

                            
                                <img src={movie.Poster} alt={movie.Title} />
                                <h3 className="moviesTitle">{movie.Title}</h3>
                            

                        </Link>
                    </li>
            ))}
            </ul>

         </div>
    )
}
