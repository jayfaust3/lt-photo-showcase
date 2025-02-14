import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FilterProps } from '../models';

export default function Filter(props: FilterProps) {
  const {
    validator,
    filterHandler,
    validationText
  } = props;

  const [searchText, setSearchText] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      validator(searchText)
    );
  }, [validator, searchText]);
  
  const handleSearchTextChange = (element: ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setSearchText(element.target.value);
  };

  const handleFilterClicked = useCallback(() => {
    filterHandler(searchText);
  }, [filterHandler, searchText]);

  return (
    <div className='right-justify content-wrapper'>
      <div className='content-wrapper even-spacing'>
        <label>Photo Title:</label>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <button
          onClick={handleFilterClicked}
          disabled={!isValid}>
            Filter
        </button>
      </div>
      <div className='content-wrapper even-spacing'>
        <span
          hidden={!isTouched || isValid}>
          {validationText}
        </span>
      </div>
    </div>
  );
}
