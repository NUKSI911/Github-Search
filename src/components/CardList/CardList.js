import React from 'react';

import Card from '../Card/Card';
import classes from './CardList.module.css';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

function CardList({ data, isLoading }) {
  let skeletonArrayList = new Array(15).fill(0);
  return (
    <div className={classes.cardListWrapper}>
      {data?.resolvedState === 'empty' && !isLoading ? (
        <div className={classes.emptyBox}> Search Repo </div>
      ) : isLoading ? (
        skeletonArrayList.map((item, i) => (
          <Skeleton key={i} height={200} width={'100%'} />
        ))
      ) : (
        data?.items?.map((template, i) => <Card data={template} key={i} />)
      )}
    </div>
  );
}

export default CardList;

CardList.defaultProps = {
  data: [],
};

CardList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
