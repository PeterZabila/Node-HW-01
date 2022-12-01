const fs = require("fs").promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');


function listContacts() {
    fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch(err => console.log(err.messaage))
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath)
    .then((data) =>
      JSON.parse(data).find(
        (contact) => contact.id.toString() === contactId.toString()
      )
    )
    .then((result) =>
      result ? console.log(result) : console.log("Contact not found")
    )
    .catch((err) => console.log(err.message));
  }


const getAll = async() => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const removeContact = async (contactId) => {
  const contacts = await getAll();
  const index = contacts.findIndex(item => item.id.toString() === contactId.toString());
  if(index === -1) {
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(result);
  return result;
}

// function removeContact(contactId) {
//   fs.readFile(contactsPath)
//     .then((data) =>
//       JSON.parse(data).find(
//         (contact) => contact.id.toString() === contactId.toString()
//       )
//         ? JSON.parse(data).filter(
//             (contact) => contact.id.toString() !== contactId.toString()
//           )
//         : (result = null)
//     )
//     .then((result) =>
//       result !== null
//         ? fs
//             .writeFile(contactsPath, JSON.stringify(result))
//             .then(() => console.log(`Contact with ID ${contactId} removed`))
//             .catch((err) => console.log(err.message))
//         : console.log("Contact not found")
//     )
//     .catch((err) => console.log(err.message));
// }

  
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath)
    .then((data) => {
      const contactsList = JSON.parse(data);
      if (
        contactsList.find(
          (contact) => contact.name.toLowerCase() === name.toLowerCase()
        ))
       {
        console.log(`${name} is already in contacts`);
        return;
      }

      contactsList.push({ name, email, phone });
      fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2)).then(
        console.log(`${name} is added to contacts`)
      );
      return;
    })

    .catch((err) => console.log(err.message));
  }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
