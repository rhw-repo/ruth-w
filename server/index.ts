import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import { connectToDatabase } from "./db.ts";
const app: Express = express();
app.use(helmet());
const port = Number(process.env.PORT) || 3000;

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.sendStatus(204);
});

await connectToDatabase();

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
