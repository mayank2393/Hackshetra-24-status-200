import { Request, Response } from "express";
import { prisma } from "../index"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthenticatedRequest from "../interfaces/authenticatedRequest";
import MulterFileRequest from "../interfaces/multerFile";
import { handleUpload } from "../utilities/cloudinaryManager";

export const signup_student = async (req: Request, res: Response) => {
    try {
        const b64 = Buffer.from((req as MulterFileRequest).file.buffer).toString("base64");
        let dataURI = "data:" + (req as MulterFileRequest).file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        req.body.profile_pic = cldRes;
    }
    catch (error: any) {
        console.log(error);
        req.body.profile_pic = null;
    }

    try {
        const { domain_id, name, role, hostel, password, phone_number, room_number, profile_pic } = req.body;
        if (!domain_id || !name || !hostel || !password) {
            return res.status(400).json({
                success: false,
                error: "Please fill all fields"
            });
        }
        if (role !== "student") {
            return res.status(400).json({
                success: false,
                error: "Invalid access to this route. Please sign up as a student."
            });
        }

        // check if user already exists or not
        const existingstudent = await prisma.student.findUnique({
            where: {
                domain_id
            }
        });

        if (existingstudent) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await prisma.student.create({
            data: {
                name,
                domain_id,
                hostel,
                phone_number,
                room_number,
                password: hashedPassword,
                profile_picture: profile_pic
            },
        });
        return res.status(200).json({
            success: true,
            message: "Student created successfully",
            student
        });
    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }
}

export const login_student = async (req: Request, res: Response) => {
    try {
        const { domain_id, password } = req.body;
        if (!domain_id || !password) {
            return res.status(400).json({
                success: false,
                error: "Please fill all fields"
            });
        }
        if (req.body.role !== "student") {
            return res.status(400).json({
                success: false,
                error: "Invalid access to this route. Please sign in as a student."
            });
        }

        const student = await prisma.student.findUnique({
            where: {
                domain_id,
            },
        })

        if (!student) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, student.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            domain_id: student.domain_id,
            role: "student"
        }, process.env.JWT_SECRET!,
            { expiresIn: "1h" })


        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        return res.cookie("token",  token, options).status(200).json({
            success: true,
            message: "Login successful",
            token,
            student
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }

}

export const createIssue = async (req: Request, res: Response) => {
    try {
        const { category, location, title, is_public, description} = req.body;
        const student_id = (req as AuthenticatedRequest).user.domain_id;
        const role = (req as AuthenticatedRequest).user.role;

        if (!category || !title || !location || !description) {
            return res.status(400).json({
                success: false,
                error: "Please fill all fields"
            });
        }
        if (role !== "student") {
            return res.status(400).json({
                success: false,
                error: "Invalid access to this route. Please sign in as a student."
            });
        }
        let isPublic = false;

        if(is_public === 'true'){
            isPublic = true;
        }
        let issue_media: any = null;
        try {
            const b64 = Buffer.from((req as MulterFileRequest).file.buffer).toString("base64");
            let dataURI = "data:" + (req as MulterFileRequest).file.mimetype + ";base64," + b64;
            const cldRes = await handleUpload(dataURI);
            req.body.issue_media = cldRes;
            issue_media = req.body.issue_media;
        }
        catch (error: any) {
            req.body.issue_media = null;
        }

        const issue = await prisma.issue.create({
            data: {
                category,
                title,
                location,
                is_public: isPublic,
                description,
                issue_media: issue_media,
                student: {
                    connect: { domain_id: student_id },
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Issue created successfully",
            issue
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Something went wrong"
        });
    }

}

export const getAllIssues = async (req: Request, res: Response) => {
    try {
        const { domain_id } = (req as AuthenticatedRequest).user;
        const { role } = (req as AuthenticatedRequest).user;

        if (role !== "student") {
            return res.status(400).json({
                success: false,
                message: "Invalid access to this route. Please sign in as a student."
            });
        }

        const issues = await prisma.issue.findMany({
            where: {
                student_id: domain_id
            }
        });

        if (issues.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No issues found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Issues fetched successfully",
            issues
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

// generate a Notification once issue created preferably sms ( TODO :)


//route for edit student profile
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