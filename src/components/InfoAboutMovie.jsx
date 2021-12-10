import React, { useEffect, useState } from 'react'
import requestMovies from '../request'
import spinner from "../style/loader.gif";

const InfoAboutMovie = (props) => {
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        requestMovies.getMovie(props.movie.Title, props.movie.Year).then(res => {
            setInfo({
                Poster: res.data.Poster,
                Released: res.data.Released,
                Runtime: res.data.Runtime,
                Genre: res.data.Genre,
                Writer: res.data.Writer,
                Actors: res.data.Actors,
                Plot: res.data.Plot,
                Awards: res.data.Awards,
                'Box Office': res.data.BoxOffice,
                Country: res.data.Country,
            })
            setLoading(false)
        })
    }, [])

    return (
        <div className='infoAboutMovie'>
            {loading ?
                <img className="spinner" src={spinner} alt="Loading spinner" />
                : <>
                    {info.Poster === 'N/A' ? ''
                        : <img className='imgPoster' src={info.Poster} alt={info.Title} />
                    }
                    <div>
                        <h2 style={{ textAlign: 'center' }}>{props.movie.Title}</h2>
                        {Object.keys(info).map(el => (
                            el !== 'Poster' &&
                            <p style={{ 'white-space': 'pre-wrap', margin: '10px 20px' }}>
                                {`${el}: ${info[el]}`}
                            </p>
                        ))}
                    </div>
                    <button className='buttonClose' onClick={() => props.closeMovie(false)}>Х</button>
                </>
            }
        </div >
    )
}

export default InfoAboutMovie