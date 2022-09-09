import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';

type Props = {
  onSearchChange: (searchStr: string) => void;
  value: string | null;
};

function BikeSearchInput(props: Props) {
  const searchInputEl = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = () => {
    if (searchInputEl.current && searchInputEl.current.value) {
      props.onSearchChange(searchInputEl.current.value);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search-input">
        <TextField
          fullWidth
          id="searchBike"
          label="City name"
          defaultValue={props.value}
          inputRef={searchInputEl}
          error={isError}
          onKeyDown={handleKeyPress}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </>
  );
}

export default BikeSearchInput;
