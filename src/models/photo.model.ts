import mongoose, { Document } from "mongoose";

const DB_URL = 'mongodb://localhost:27017/online-shop'
export interface PhotoDocument extends Document {
    path: string,
    title?: string
}

const photoSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    title: String
})

export const Photo = mongoose.model("Photo", photoSchema);

export const saveNewPhoto = async(image: string, title: string) =>{
    try{
        let photo = new Photo({
            path: image,
            title: title
        })
        await photo.save()
        return photo
    }catch(err){
        throw err
    }
}