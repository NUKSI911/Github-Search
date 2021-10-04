import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import isEmpty from 'lodash/isEmpty';
import Modal from './../Modal';
import PropTypes from 'prop-types';

import { useFetchContributors } from '../../hooks/useFetch';
import { handleApiError } from '../../config/methods';
import './index.css';
import ToolTip from '../Tooltip';

export default function Contributors({ fullName }) {
  const [enabled, setEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data = [],
    isLoading,
    error,
    isError,
    isFetched,
  } = useFetchContributors(fullName, 1, { enabled });

  useEffect(() => {
    isError && handleApiError(error);
  }, [error, isError]);

  const handleContributorView = () => {
    setEnabled(!enabled);
  };

  const handleToggleModal = () => setIsOpen((prev) => !prev);

  return (
    <div className='contributors-container'>
      {!(isFetched || isLoading) && (
        <span onClick={handleContributorView}> View Contributors</span>
      )}

      {isLoading && <Skeleton count={5} circle={true} height={30} width={30} />}

      {isFetched && (
        <div>
          <p>
            {data.length > 5 && 'First'} {data.length >= 5 ? 5 : data.length}{' '}
            Contributors
          </p>
          <div style={{ display: 'flex' }}>
            {data?.slice(0, 5).map((contributor, index) => {
              return (
                <ToolTip
                  key={index}
                  id={contributor?.login}
                  title={<Image contributor={contributor} />}>
                  <Info contributor={contributor} />
                </ToolTip>
              );
            })}

            {data.length > 5 && (
              <span onClick={handleToggleModal} className='view-all-btn'>
                {' '}
                View All{' '}
              </span>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          ModalTitle={`Contributors for ${fullName}`}
          toggleModal={handleToggleModal}
          isOpen={isOpen}>
          {isLoading ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : isLoading ? (
            <p style={{ textAlign: 'center' }}>Error Fetching Contributors</p>
          ) : (
            !isEmpty(data) && renderContributorsResult(data)
          )}
        </Modal>
      )}
    </div>
  );
}

Contributors.propTypes = {
  fullName: PropTypes.string.isRequired,
};

function Image({ contributor }) {
  return (
    <img
      src={contributor?.avatar_url}
      alt={contributor?.login}
      width={30}
      height={30}
      style={{ borderRadius: '50%' }}
      title={contributor?.login}
    />
  );
}
Image.propTypes = {
  contributor: PropTypes.object.isRequired,
};

function renderContributorsResult(data = []) {
  return (
    <div className='contributors-wrapper'>
      {data?.map((item) => (
        <li key={item.id}>
          <div className='image-wrapper'>
            <div className='image'>
              <img src={item.avatar_url} alt={item.login} />
            </div>
            <p>{item.login}</p>
          </div>
          <p className='contributions'>{item.contributions} contributions</p>
        </li>
      ))}
    </div>
  );
}

const Info = ({ contributor }) => {
  return (
    <div>
      <div class='info-item'>
        <span>User </span> <span children='-' />
        <span>{contributor?.login}</span>
      </div>
      <div class='info-item'>
        <span>Contributions </span> <span children='-' />
        <span>{contributor?.contributions}</span>
      </div>
    </div>
  );
};

Info.propTypes = {
  contributor: PropTypes.object.isRequired,
};
