import { Module } from '@nestjs/common';
import { AuhtFirebaseController } from './auht-firebase.controller';
import { AuthFirebaseService } from './auth-firebase.service';

@Module({
    providers: [AuthFirebaseService],
    controllers: [AuhtFirebaseController],
    imports: [],
    exports: [AuthFirebaseService]
  })
export class FirebaseAdminModule {}
