import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, findPicture } from '../utils/service';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const Search = () => {
    // save picture
    const [pins, setPins] = useState();
    // set State
    const [loading, setLoading] = useState(false);
    // get `searchQuery` from url
    const { searchQuery } = useParams()

    useEffect(() => {
        // get picture from sanity by searchQuery
        if (searchQuery !== '') {
            setLoading(true);
            findPicture(searchQuery.toLowerCase())
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                });
        } else {
            feedQuery().then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [searchQuery]);

    return (
        <div>

            {loading && <Spinner message="Searching pins" />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchQuery !== '' && !loading && (
                <div className="mt-10 text-center text-xl ">No Pins Found!</div>
            )}
        </div>
    );
};

export default Search;
