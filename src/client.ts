import { PrismaClient } from '@prisma/client';


/*
* Connection to DB.
*
* Don't create new instances of PrismaClient! Always use this instance.
*
* To access DB use: connection.<model>.<operation>(<criteria>)
* <model> is the model, as defined in schema.prisma, that should be operated on.
* <operation> is the operation that should be performed
* <criteria> are the criteria, on which objects the operation should be executed. 
*
*/
export const connection: PrismaClient = new PrismaClient();