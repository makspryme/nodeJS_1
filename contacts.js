import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
const moviesPath = path.resolve('db', 'contacts.json');

const stringyfyContacts = (movies) =>
  fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));

export const listContacts = async () => {
  const movies = await fs.readFile(moviesPath);

  return JSON.parse(movies);
};

export const getContactById = async (id) => {
  const movies = await listContacts();

  const movieId = await movies.find((item) => item.id === id);

  return movieId || null;
};

export const addContact = async (data) => {
  const newContact = {
    id: nanoid(),
    ...data,
  };

  const movies = await listContacts();
  movies.push(newContact);

  await stringyfyContacts(movies);
  return movies;
};

export const removeContact = async (id) => {
  const movies = await listContacts();

  const index = movies.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [contact] = movies.splice(index, 1);

  await stringyfyContacts(movies);

  return contact;
};
