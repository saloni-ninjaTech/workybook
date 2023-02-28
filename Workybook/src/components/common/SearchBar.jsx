import { AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { search, searchSuggest, reset } from '../../app/features/search/searchpageSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [optionsVal, setoptionVal] = useState([]);
  const { suggestKeyword } = useSelector((state) => state.search);

  const options = suggestKeyword?.result ? suggestKeyword?.result : [];

  const onSearchtext = (value) => {
    if (value !== '' && value !== undefined) {
      dispatch(
        search({
          search: value,
          subject: [],
          grade: [],
          commonCoreStandards: [],
          stds_topic: []
        })
      );
      navigate('/explore/search-result');
    }
  };

  const onChangekeyword = (value) => {
    if (value) {
      dispatch(
        searchSuggest({
          search: value
        })
      );
    } else {
      dispatch(reset());
    }
  };

  useEffect(() => {
    if (suggestKeyword) {
      const obj5 = {
        ...options
      };
      const obj6 = Object.keys(obj5).map((k) => ({
        value: obj5[k]
      }));
      setoptionVal(obj6.slice(0, 30));
    }
  }, [suggestKeyword]);

  return (
    <div className='w-full py-3 flex items-center bg-[#243E8F]'>
      <AutoComplete
        autoFocus
        backfill
        className='w-1/2 mx-auto'
        placeholder='Search by common core standard, topic or keyword'
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSearchtext(e.target.value);
          }
        }}
        virtual={false}
        onSelect={onSearchtext}
        onChange={onChangekeyword}
        options={optionsVal || []}
      />
    </div>
  );
}
export default SearchBar;
