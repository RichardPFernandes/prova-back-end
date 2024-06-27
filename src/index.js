const express = require("express");
const database = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);

database.db
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados", error);
  });


module.exports = app;