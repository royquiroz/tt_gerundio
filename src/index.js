import app from "./app";

const main = async () => {
  const PORT = app.get("port");

  app.listen(PORT);
  console.log(`Server on port ${PORT}`);
};

main();
