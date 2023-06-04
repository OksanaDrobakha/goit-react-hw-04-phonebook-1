import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';
export function Filter({ filterValue, onChangeInput }) {
  return (
    <>
      <label>
        <div className={css.filter}>Find contacts by name:</div>
        <input
          onChange={onChangeInput}
          value={filterValue}
          type="text"
          name="filter"
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
