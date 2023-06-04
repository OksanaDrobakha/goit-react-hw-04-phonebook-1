import { useState, useEffect } from 'react';
import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const KEY = 'contacts';

const testContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() =>
    localStorage.getItem(KEY)
      ? JSON.parse(localStorage.getItem(KEY))
      : testContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(KEY));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const names = contacts.map(item => item.name);

    if (names.some(name => name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts.`);
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const onRemove = contactName => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactName)
    );
  };

  const filterContacts = value => {
    setFilter(value);
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} onChangeInput={filterContacts} />
      {Filter.length > 0 && (
        <ContactList onRemove={onRemove} contacts={filteredContacts} />
      )}
    </div>
  );
}
