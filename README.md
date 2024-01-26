# DataTablePlugin

DataTablePlugin is a custom React component, part of a project on the [OpenClassrooms Front-End learning path](https://openclassrooms.com/fr/paths/516-developpeur-dapplication-javascript-react).
It's designed to display, sort, filter, paginate, and manage tabular data efficiently.

**Example Usage**:

```jsx
<DataTablePlugin data={data} columns={columns} />
```

✨ Features and Interface
The component offers functionalities like sorting, searching, pagination, and error handling with an intuitive UI.

🚀 Installation as an npm package
1 - install the package

```bash
npm install ebo-react-datatable
```

2 - Import and use in your React project:

```jsx
import DataTablePlugin from 'ebo-react-datatable';
import 'ebo-react-datatable/dist/DataTablePlugin.css';

// Define data and columns
const data = [{...}, {...}];
const columns = [{ title: 'First Name', key: 'firstName' }, ...];

function App() {
    return <DataTablePlugin data={data} columns={columns} />;
}
```

The DataTablePlugin component takes the following props:

data: An array of objects representing the rows in the table.
columns: An array of objects representing the columns in the table. Each object should have a title (the column header) and a key (the key in the data that this column should display).

exemple:

```jsx
const columns = [
  { title: "First Name", data: "firstName" },
  { title: "Last Name", data: "lastName" },
  { title: "Start Date", data: "startDate" },
  { title: "Department", data: "department" },
  { title: "Date of Birth", data: "dateOfBirth" },
  { title: "Street", data: "street" },
  { title: "City", data: "city" },
  { title: "State", data: "state" },
  { title: "Zip Code", data: "zipCode" },
];

const users = [
  {
    firstName: "Patrick",
    lastName: "Ward",
    dateOfBirth: "07/04/1987",
    startDate: "12/28/2022",
    department: "Finance",
    street: "160 Michael Garden",
    city: "Singhberg",
    state: "AZ",
    zipCode: "65578",
  },
];
return <DataTablePlugin data={users} columns={columns} />;
```

🛠️ Setup and Development
To set up and start developing:

1 - Clone the repository:

```bash
git clone <repository-url>
```

2 - Install dependencies:

```bash
cd Front
npm install
```

3 - Start the development server:

```bash
npm start
```

4 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The server will start on localhost:3000.

📝 License
This project is licensed under the MIT License.

👨‍💻 Author
This project was created by [Eric Bouillaut](e.bouillaut@yahoo.fr).
