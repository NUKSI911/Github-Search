import React from 'react';
import classes from './Card.module.css';
import PropTypes from 'prop-types';
import Contributors from '../Contributors';
function Card({ data }) {
  return (
    <div className={classes.cardWrapper}>
      <div className={classes.cardContent}>
        <img
          src={data?.owner?.avatar_url}
          width={70}
          alt=''
          style={{ borderRadius: '50%' }}
        />
        <h1 className={classes.contentTitle}> Username : {data.owner.login}</h1>
        <p className={classes.cardDesc}> Full name : {data.full_name}</p>
        <p className={classes.cardDesc}> Forks : {data.forks}</p>
        <p className={classes.cardDesc}> Open Issues : {data.open_issues}</p>
        <p className={classes.cardDesc}> Stars : {data.stargazers_count}</p>
      </div>

      <Contributors fullName={data?.full_name} />
    </div>
  );
}

export default Card;

Card.defaultProps = {
  data: {},
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
};
