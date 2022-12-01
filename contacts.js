const fs = require("fs").promises;
const path = require('path');
const {nanoid} = require("nanoid")

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  console.table(JSON.parse(data));
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const result = contacts.find(contact => contact.id.toString() === contactId.toString())   
    result ? console.log(result) : console.log("Contact not found")
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const index = contacts.findIndex(item => item.id.toString() === contactId.toString());
  if(index === -1) {
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`${result.name} sucessfully removed from the contact list`);
}
  
const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contactId = nanoid();

  if (contacts.find(contact => contact.email.toLowerCase() === email.toLowerCase())) {
      console.log(`User with email address ${email} is already in the contact list`);
      return;
  }
  contacts.push({name, email, phone, id: contactId});
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`${name} is added to contacts`)
  return;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
