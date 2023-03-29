const app = require('./app');
const connectDatabase = require('./db');

//Connecting to the database
connectDatabase();

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Server working on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	res.send('API is working fine');
});


//Unhandled promise rejection   (If any connection string or any server related error)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})
