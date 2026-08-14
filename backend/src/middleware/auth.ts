import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    customerId?: string;
    role?: string;
}

//  Verifies the Bearer JWT and attaches the customer's identity to the request
export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Authentication token is required"
        });
    }

    const token = authHeader.slice("Bearer ".length);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { customerId: string; role: string };
        req.customerId = payload.customerId;
        req.role = payload.role;
        next();
    } catch {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
}
