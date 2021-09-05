import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import firebase from 'firebase-admin';

export class StampingDto {

    @ApiProperty() @IsString()
    _id: string;

    @ApiProperty() @IsString()
    id_user: string;
    
    @ApiProperty() @IsString()
    title: string;

    @ApiProperty() @IsString()
    subtitle: string;

    @ApiProperty() @IsString()
    address: string;

    @ApiProperty() @IsString()
    start_time: string;

    @ApiProperty() @IsString()
    end_time: string;

    @ApiProperty() @IsString()
    start_stamped_time: string;

    @ApiProperty() @IsString()
    end_stamped_time: string;

    @ApiProperty() @IsNumber()
    latitude: number;

    @ApiProperty() @IsNumber()
    longitude: number;
}