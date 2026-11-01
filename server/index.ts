import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { connectToDatabase } from "./db.ts";
import { ProjectModel } from "./models/project.ts";

const app: Express = express();

app.use(helmet());

// TEMP: debug CORS on Railway. Remove once fixed.
console.log(`CORS origin: ${process.env.CLIENT_ORIGIN ?? "(unset, using localhost)"}`);
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
const port = Number(process.env.PORT) || 3000;

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.sendStatus(204);
});

// The API is for the client app, not for viewing in the address bar.
app.use("/api", (req, res, next) => {
  if (req.get("Sec-Fetch-Mode") === "navigate") {
    res.sendStatus(404);
    return;
  }
  next();
});

app.get("/api/projects", async (_req: Request, res: Response) => {
  const projects = await ProjectModel.find().sort({ order: 1 }).lean();
  res.json(projects);
});

await connectToDatabase();

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
