console.log("Hello");

const logger = require('./contacts');

logger.listContacts();
logger.getContactById(3);
logger.removeContact(2);
logger.addContact("Allen Raymond",
"nulla.ante@vestibul.co.uk", "(992) 914-3792")