// file `ormconfig.ts`
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

};
export default config;