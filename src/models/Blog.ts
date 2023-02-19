import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role } from './Role.enum';

interface BlogDoc extends Document {
    title: string;
    contents: string;
    blogger: string;
}

const BlogSchema = new Schema({
    title: { 
        type: String, 
        required: true,
        unique: true,
    },
    contents: { 
        type: String, 
        required: true
    },
    blogger: { 
        type: String, 
        required: true
    },
},{
    toJSON : {//this is to lite the response data
        transform(doc, ret){
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

const Blog = mongoose.model<BlogDoc>('Blog', BlogSchema);
export { Blog }