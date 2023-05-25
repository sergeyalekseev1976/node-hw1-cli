const contactsService = require("./contacts")


const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
     const allContacts = await contactsService.listContacts();
     console.table(allContacts)
      break;

    case "get":
      const contact = await contactsService.getContactById(id)
      if (!contact) {
         console.log("Contact not found!");
         break;
      }
      console.log(contact);
      break;

    case "add":
     const newContact = await contactsService.addContact(name, email, phone)
     console.log(newContact);
      break;

    case "remove":
        const removedContact = await contactsService.removeContact(id);
        if (!removedContact) {
          console.log("Contact not found!");
          break;
        }
        console.log(removedContact);
        break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);