import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { CreatePin, Feed, Navbar, PinDetail, Search } from '../components'
const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  return <div
    className="px-2 md:px-5"

  >
    <div className="bg-gray-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
    </div>
    <div className="h-full">
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/categories/:categoryId' element={<Feed />} />
        <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />} />
        <Route path='/create-pin' element={<CreatePin user={user} />} />
        <Route path='/search/:searchQuery' element={<Search user={user} />} />
      </Routes>
    </div>
  </div>;
};

export default Pins;