import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { connectToDatabase } from "./db.ts";
import { ProjectModel } from "./models/project.ts";
import { ProfileModel } from "./models/profile.ts";

const app: Express = express();

app.use(helmet());

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
const port = Number(process.env.PORT) || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.sendStatus(204);
});

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

app.get("/api/profile", async (_req: Request, res: Response) => {
  const profile = await ProfileModel.findOne()
    .select("name role stack links")
    .lean();
  if (!profile) {
    res.sendStatus(404);
    return;
  }
  res.json(profile);
});

await connectToDatabase();

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
