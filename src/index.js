const express = require("express");
const morgan = require("express");
const cors = require("cors")

const listaRoutes = require("./routes/lista.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());

app.use(listaRoutes);
app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  });

app.listen(4000)
console.log('Server on port 4000');