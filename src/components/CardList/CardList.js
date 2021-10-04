import React from 'react';

import Card from '../Card/Card';
import classes from './CardList.module.css';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

function CardList({ data, isLoading }) {
  let skeletonArrayList = new Array(15).fill(0);

  const renderComponent = () => {
    switch (true) {
      case data?.resolvedState === 'empty' && !isLoading: {
        return (
          <div className={classes.emptyBox}>
            Search Result will be displayed here{' '}
          </div>
        );
      }

      case isLoading: {
        return skeletonArrayList.map((item, i) => (
          <Skeleton key={i} height={200} width={'100%'} />
        ));
      }

      case data?.items?.length > 0: {
        return data?.items?.map((template, i) => (
          <Card data={template} key={i} />
        ));
      }

      default: {
        return <p> No Repo found , try again </p>;
      }
    }
  };

  return <div className={classes.cardListWrapper}>{renderComponent()}</div>;
}

export default CardList;

CardList.defaultProps = {
  data: null,
};

CardList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
