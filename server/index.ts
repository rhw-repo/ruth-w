import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";

const app: Express = express();
app.use(helmet());
const port = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
