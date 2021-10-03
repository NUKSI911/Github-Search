import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardList from '../../components/CardList/CardList';
import classes from './Home.module.css';

import rightArr from '../../assets/icons/rightArr.svg';
import { useFetchRepos } from '../../hooks/useFetch';
import { handleApiError } from '../../config/methods';

import searchIcon from '../../assets/icons/search.svg';

const initialData = {
  resolvedState: 'empty',
};

function Home() {
  const [pageNo, setPageNo] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);

  const {
    data = initialData,
    isLoading,
    error,
    isError,
  } = useFetchRepos(searchTerm, pageNo, {
    enabled: !!searchTerm,
  });

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchValue);
  };

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearch();
    }
  };
  useEffect(() => {
    isError && handleApiError(error);
  }, [error, isError]);

  const scrollToTop = () => {
    window.scroll({
      behavior: 'smooth',
      block: 'start',
      top: 0,
    });
  };

  const totalPages = data?.total_count / 30;

  return (
    <>
      <div className={classes.templateTopSec}>
        <div className={classes.searchContainer}>
          <span className={classes.searchIcon}>
            <img src={searchIcon} alt='' />
          </span>
          <input
            name='searchBox'
            className={classes.searchBox}
            value={searchValue}
            onChange={handleValueChange}
            placeholder='Search Github'
            type='search'
            autoComplete='off'
            onKeyUp={handleEnterKey}
          />
          <div>
            <button className={classes.searchBtn} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div>
        <CardList data={data} isLoading={isLoading} />
      </div>

      <div
        className={classes.paginateContainer}
        style={{
          position: 'initial',
          bottom: 0,
          background: 'initial',
        }}>
        {data?.items?.length > 0 && (
          <>
            <button
              className={classes.paginateBtn}
              disabled={pageNo === 1}
              onClick={() => {
                setPageNo((page) => page - 1);
                scrollToTop();
              }}>
              <span>Previous</span>
            </button>

            <div className={classes.noTotalContainer}>
              <span
                className={[classes.presentPageNo, classes.pagItem].join(' ')}>
                {pageNo}
              </span>
              <span className={classes.pagItem}>of</span>
              <span className={classes.pagItem}>
                {totalPages && Math.floor(totalPages)}
              </span>
            </div>
            <button
              className={classes.paginateBtn}
              disabled={data.length < pageNo * 15}
              onClick={() => {
                setPageNo((page) => page + 1);
                scrollToTop();
              }}>
              <span>
                Next <img src={rightArr} alt='' style={{ marginLeft: '4px' }} />
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
