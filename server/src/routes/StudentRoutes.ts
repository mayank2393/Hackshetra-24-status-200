import { Router } from "express";
import { edit_profile, fileMessRebate, getMessRebate } from "../controllers/Student";
import authenticateToken from "../middlewares/jwtVerification";
import { studentAuth } from "../middlewares/roleAuthentication";
import upload from "../utilities/multerInitialize";

const StudentRoutes: Router = Router();
StudentRoutes.put("/edit_profile", upload.single("file"), authenticateToken, studentAuth , edit_profile);
StudentRoutes.post("/rebate", authenticateToken, studentAuth , fileMessRebate);
StudentRoutes.get("/rebate", authenticateToken, studentAuth , getMessRebate);

export default StudentRoutes;