import { Document } from "mongoose";

export interface User extends Document {
    _id: string;
    email: string;
    pwd: string;
}