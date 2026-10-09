import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import { connectToDatabase } from "./db.ts";
import { ProjectModel } from "./models/Project.ts";
const app: Express = express();
app.use(helmet());
const port = Number(process.env.PORT) || 3000;

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.sendStatus(204);
});

app.get("/api/projects", async (_req: Request, res: Response) => {
  const projects = await ProjectModel.find().sort({ order: 1 }).lean();
  res.json(projects);
});

await connectToDatabase();

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
