import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import { CloseIcon } from '../../utils/icons';
import './modal.css';

const propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  ModalTitle: PropTypes.string,
};

const defaultProps = {
  styles: undefined,
  className: undefined,
  children: undefined,
  isOpen: false,
  toggleModal: () => {},
  ModalTitle: 'Modal Title',
};

function Modal({
  className,
  styles,
  children,
  isOpen,
  toggleModal,
  ModalTitle,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Portal>
          <div
            className={['scroll-overlay', className].join(' ')}
            onClick={toggleModal}>
            <div
              onClick={(e) => e.stopPropagation()}
              {...styles}
              className={['style-modal', className].join(' ')}>
              <div className='modal-header'>
                <h3>{ModalTitle}</h3>
                <span onClick={toggleModal}>
                  <CloseIcon className='close-icon' />
                </span>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
