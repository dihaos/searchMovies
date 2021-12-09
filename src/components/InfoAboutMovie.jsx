import React, { useEffect, useState } from 'react'
import requestMovies from '../request'

const InfoAboutMovie = (props) => {
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        requestMovies.getMovie(props.movie.Title, props.movie.Year).then(res => {
            setInfo(res.data)
            setLoading(false)
        })


    }, [])
    console.log(info)
    return (
        <div className='infoAboutMovie'>
            {loading ?
                ''
                : <>
                    {/* <button onClick={() => props.closeMovie(false)}>закрыть</button> */}
                    <img className='imgPoster' src={info.Poster} alt={info.Title} />
                    {/* <div> */}
                        <ul>
                            {Object.keys(info).map(el => (
                                <li style={{'white-space': 'pre-wrap'}}>{`${el}:${info[el]}`}</li>
                            ))}
                        </ul>
                    {/* </div> */}
                </>
            }
        </div>
    )
}

export default InfoAboutMovie