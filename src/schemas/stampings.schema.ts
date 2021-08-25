import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StampingDocument = Stamping & Document;

@Schema()
export class Stamping {
    @Prop()
    name: string;

    @Prop()
    checkin: Date;

    @Prop()
    checkout: Date;

    @Prop()
    checkin_stamped: Date;

    @Prop()
    checkout_stamped: Date;
}

export const StampingSchema = SchemaFactory.createForClass(Stamping);
