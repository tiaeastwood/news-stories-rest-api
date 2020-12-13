const app = require("./app");
// const PORT = process.env.PORT || 9090;

// app.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`Listening on port ${PORT}`);
// })

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
