import { Router } from "express";
import { edit_profile } from "../controllers/HostelAdmin";
import { hostelAdminAuth } from "../middlewares/roleAuthentication";
import authenticateToken from "../middlewares/jwtVerification";

const hostelAdminRoutes: Router = Router();

hostelAdminRoutes.put("/edit_profile",authenticateToken, hostelAdminAuth, edit_profile);

export default hostelAdminRoutes;