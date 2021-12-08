import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
  };

  return (
    <form className="search" onSubmit={callSearchFunction}>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input type="submit" value="Поиск" />
    </form>
  );
};

export default Search;