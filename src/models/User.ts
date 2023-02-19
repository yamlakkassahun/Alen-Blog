import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role } from './Role.enum';

interface UserDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    role: Role;
    status: any;
    blogs: [any];
    bookmarks: [any];
}

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    salt: { 
        type: String, 
        required: true
    },
    firstName: { 
        type: String
    },
    lastName: { 
        type: String
    },
    role: { 
        type: String,
        enum: ['ROLE_BLOGGER', 'ROLE_ADMIN', 'ROLE_USER'],
    },
    status: {
        type: String,
        enum: ['Active','InActive'],
    },
    blogs: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Blog"
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Blog"
        }
    ],
},{
    toJSON : {//this is to lite the response data
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            delete ret.salt
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

const User = mongoose.model<UserDoc>('User', UserSchema);
export { User }