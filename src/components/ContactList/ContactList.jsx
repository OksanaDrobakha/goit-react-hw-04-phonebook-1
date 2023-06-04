import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onRemove }) => {
  return (
    <>
      <ul className={css.list}>
        {contacts.map(contact => {
          return (
            <li key={contact.id} className={css.element}>
              <span>{contact.name}:</span>
              <span>{contact.number}</span>
              <button
                className={css.btnDelete}
                type="button"
                onClick={() => {
                  onRemove(contact.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  onRemove: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
