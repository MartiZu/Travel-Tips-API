import { app } from "./app.js";

const port = 5501;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
