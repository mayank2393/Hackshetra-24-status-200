import { Request, Response, response } from "express";
import { prisma } from "../index"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthenticatedRequest from "../interfaces/authenticatedRequest";

export const signup_hostelAdmin = async (req: Request, res: Response) => {
    try {
        const { domain_id, name, role, hostel, password, phone_number } = req.body;

        if (!domain_id || !name || !hostel || !password || !phone_number) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        if (role !== "hostel_admin") {
            return res.status(400).json({
                success: false,
                message: "Invalid access to this route. Please sign up as a hostel admin."
            });
        }

        //check whether the hostel admin already exists or not
        const existingHostelAdmin = await prisma.hostel_admin.findUnique(
            {
                where: {
                    domain_id
                }
            }
        )
        if (existingHostelAdmin) {
            return res.status(400).json({
                success: false,
                message: "Hostel Admin already exists. Please sign in to continue."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const hostelAdmin = await prisma.hostel_admin.create({
            data: {
                name,
                domain_id,
                hostel,
                phone_number,
                password: hashedPassword
            }
        });

        return res.status(200).json({
            success: true,
            message: "Hostel Admin created successfully",
            hostelAdmin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const login_hostelAdmin = async (req: Request, res: Response) => {
    try {
        const { domain_id, password } = req.body;
        if (!domain_id || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        if (req.body.role !== "hostel_admin") {
            return res.status(400).json({
                success: false,
                message: "Invalid access to this route. Please sign in as a hostel admin."
            });
        }

        const hostelAdmin = await prisma.hostel_admin.findUnique({
            where: {
                domain_id
            }
        })

        if (!hostelAdmin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        //check if the password is correct
        const validPassword = await bcrypt.compare(password, hostelAdmin.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        //create and assign a token
        const token = jwt.sign({
            domain_id: hostelAdmin.domain_id,
            role: "hostel_admin"
        }, process.env.JWT_SECRET!,
            { expiresIn: "1h" })

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            hostelAdmin
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

}

export const assignHostelIssue = async (req: Request, res: Response) => {
    try {
        const { domain_id } = (req as AuthenticatedRequest).user;
        const { issue_id, technician_id } = req.body;
        if (!domain_id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        if (!technician_id) {
            return res.status(400).json({
                success: false,
                message: "No Technician selected"
            });
        }
        const issue = await prisma.issue.findUnique({
            where: {
                issue_id: Number(issue_id)
            }
        });

        const technician = await prisma.technician.findUnique({
            where: {
                technician_id: technician_id
            }
        });

        if(issue?.category !== technician?.category){
            return res.json({
                message: "please select technician with matching category"
            });
        }
        const updatedIssue = await prisma.issue.update({
            where: {
                issue_id: Number(issue_id),
            },
            data: {
                technician_id: technician_id,
            },
        });

        return res.json({
            success: true,
            message: "Issue assigned successfully",
            issue: updatedIssue,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export const reviewHostelIssue = async (req: Request, res: Response) => {
    try {
        const { domain_id } = (req as AuthenticatedRequest).user;
        const { issue_id } = req.body;

        if (!domain_id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const issue = await prisma.issue.delete({
            where: {
                issue_id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Issues reviewed and resolved successfully",
            issue
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }

}

export const checkHostelIssue = async (req: Request, res: Response) => {
    try {
        const { domain_id } = (req as AuthenticatedRequest).user;
        if (!domain_id) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const hostelAdmin = await prisma.hostel_admin.findUnique({
            where: {
                domain_id
            }
        })
        if (!hostelAdmin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const hostel = hostelAdmin.hostel;
        const issues = await prisma.issue.findMany({
            where: {
                location: hostel,
                is_resolved: false
            }
        });
        return res.status(200).json({
            success: true,
            message: "Here is the list of assigned issues at your hostel",
            issues
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }
}


//route for edit HostelAdmin profile
export const edit_profile=async(req:Request , res:Response)=>{
    try {
        const {domain_id} = (req as AuthenticatedRequest).user;
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}