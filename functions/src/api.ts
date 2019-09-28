import { Router } from "express";
const api = Router();

api.use("/time", (req, res) => {
  res.send(`Date.Now: ${Date.now()}`);
});
api.use("/time-cached", (req, res) => {
  res.set("Cache-Control", "public, max-age=200, s-maxage=600");
  res.send(`Now: ${Date.now()}`);
});
export default api;
