import { app } from "./app.js";

require("dotenv").config();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
