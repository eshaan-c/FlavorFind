# FlavorFind

Getting Started
To run the Flavor Find application locally, follow these steps:

Clone the repository:

bashCopy codegit clone https://github.com/your-username/flavor-find.git

Install the required dependencies:

bashCopy code# Install server-side dependencies
cd flavor-find/server
npm install

# Install client-side dependencies
cd ../client
npm install

Set up the databases (PostgreSQL) and update the database configuration files accordingly.
Start the server and client:

bashCopy code# Start the server
cd ../server
npm start

# Start the client (in a new terminal window)
cd ../client
npm start
The client should now be running at http://localhost:3000, and the server should be running at http://localhost:5000.
To run the application, you need to start both the server and the client. In the server folder, run npm start to start the server. Then, in a new terminal window, navigate to the client folder and run npm start to start the client-side application.
