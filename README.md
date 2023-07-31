# ApiContacts

This project is an API for registering contacts and linking phones to them, each contact being able to have more than one phone linked.

# Installation

Clone the repository locally and access each folder in a terminal:

```cd apiContacts_back ```

```cd apiContacts_front ```

- In the apiContacts_back repository, run the following commands:

  ```npm install```
  
  ```npx sequelize db:migrate```
  
  ```npm start```

- In the apiContacts_front repository, run the following commands:

  ```npm install```
  
  ```npm start```

# Endpoints

### Contacts

List contacts: GET ```/contacts```

Search contact by ID: GET ```/contacts/:id```

Create contact: POST ```/contacts```

Update contact by ID: PUT ```/contacts/:id```

Delete contact by ID: DELETE ```/contacts/:id```

### Phones

List phones: GET ```/phones```

Search phone by ID: GET ```/phones/:id```

Create new phone: POST ```/phones```

Update phone by ID: PUT ```/phones/:id```

Delete phone by ID: DELETE ```/phones/:id```

Search phone by ContactId: GET ```/phones/contact/:id```
