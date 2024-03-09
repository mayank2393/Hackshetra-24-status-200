import { Router } from "express";
import { edit_profile } from "../controllers/Student";
import authenticateToken from "../middlewares/jwtVerification";
import { studentAuth } from "../middlewares/roleAuthentication";
import upload from "../utilities/multerInitialize";

const StudentRoutes: Router = Router();
StudentRoutes.put("/edit_profile", upload.single("file"), authenticateToken, studentAuth , edit_profile);

export default StudentRoutes;