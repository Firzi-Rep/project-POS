import mongoose, { Document, Schema } from 'mongoose';

export class UpdateMenuRequest {
    name: string;
    price: number;
}


export interface IMenu extends Document {
  name: string;
  price: number;
  // Add any other properties as needed
}

const menuSchema = new Schema<IMenu>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Add any other schema properties as needed
});

export const MenuModel = mongoose.model<IMenu>('Menu', menuSchema);