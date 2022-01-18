import {TypeOrmModuleOptions} from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
    public createTypeOrmProdConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'o6mz9QHYr76pIHND',
            logging: true,
            database: 'trello-db',
            synchronize: true,
            autoLoadEntities: true,
            // entities: ['dist/**/*.entity{*.ts,*.js}'],
            logger: 'advanced-console',
        };
    }
}

const configService = new ConfigService();
export default configService;

//docker run --name trello-pg -e POSTGRES_DATABASE=trello-db -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=o6mz9QHYr76pIHND -d postgres
