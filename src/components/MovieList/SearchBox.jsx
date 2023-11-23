import React from 'react';

const SearchBox = (props) => {
	const handleChange = (e) => {
    if (typeof props.searchFunction === 'function') {
      props.searchFunction(e.target.value);
    }

    if (typeof props.setSearchValue === 'function') {
      props.setSearchValue(e.target.value);
    }
    
  };

	return (
		<div className='col col-sm-4 me-5'>
      <label>
			<input
				className='form-control'
				value={props.searchValue}
				onChange={handleChange}
				placeholder='영화 검색...'
			/>
      </label>
      <input type='submit' value='search' onClick={props.onSearch}></input>
		</div>
	);
};

export default SearchBox;