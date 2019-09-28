import * as functions from "firebase-functions";
import * as express from "express";
import apiRoute from "./api";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app = express();
app.use("/api", apiRoute);

export const api = functions.https.onRequest(app);
