import { ChangeEvent } from 'react';
import { FilterProps } from '../models';

export default function Filter(props: FilterProps) {
  const {
    filter,
    titleChangeHandler
  } = props;

  const handleTitleSearch = (element: ChangeEvent<HTMLInputElement>) => {
    titleChangeHandler(element.target.value);
  };

  return (
    <div className='right-justify content-wrapper'>
      <label>Photo Title</label>
      <input
        type="text"
        value={filter.title ?? ''}
        onChange={handleTitleSearch}
      />
    </div>
  );
}
