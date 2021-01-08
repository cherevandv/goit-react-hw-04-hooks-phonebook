import { useState } from 'react';
import s from './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './hooks/useLocalStorage';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const initialData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialData);
  const [filter, setFilter] = useState('');

  const createContact = ({ name, number }) => {
    if (!name || !number) {
      return alert(`Some field is empty.`);
    }
    const sameName = findSameName(name);
    if (sameName) {
      return alert(`${name} is already in contacts.`);
    }
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const findSameName = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisiblesContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };
  const filtredContacts = getVisiblesContacts();

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={createContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filtredContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
