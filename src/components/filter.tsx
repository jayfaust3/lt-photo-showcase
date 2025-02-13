import { useState, useCallback } from 'react';
import { FilterProps } from '../models';

export default function Filter(props: FilterProps) {
  const {
    filter,
    titleChangeHandler
  } = props;

  const handleTitleSearch = useCallback(() => {
    titleChangeHandler();
  }, [titleChangeHandler]);

  return (
    <div className='right-justify content-wrapper'>
      <input
        type="text"
        value={filter.title ?? ''}
        onChange={handleTitleSearch}
      />
    </div>
  );
}
