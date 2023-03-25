import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { feedQuery, findPicture } from '../utils/service'
import { MasonryLayout, Spinner } from './index'


const Feed = () => {
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()
    const [pins, setPins] = useState([])
    useEffect(() => {
        if (categoryId) {
            findPicture(categoryId)
                .then(res => {

                    setPins(res)
                    setLoading(false)
                })
        } else {
            feedQuery()
                .then(res => {

                    setPins(res)
                    setLoading(false)
                })
        }
    }, [categoryId])
    const ideaName = categoryId || 'new';
    if (loading) return <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    return (
        <div>
            {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}

export default Feed
