import { program } from "commander";
import contactsServises from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServises.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await contactsServises.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await contactsServises.addContact({
        name,
        email,
        phone,
      });
      return console.table(newContact);

      break;

    case "remove":
      const deleteContact = await contactsServises.removeContact(id);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//   name: "Kiwi",
//   email: "kiwi@gmail.com",
//   phone: "555 - 55 - 55",
// });
