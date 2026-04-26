import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClinet } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {

    async  onModuleInit() {
        await this.$connect() //connect to db
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

}
