import {TypeOrmModuleOptions} from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {
    public createTypeOrmProdConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'admin',
            password: 'o6mz9QHYr76pIHND',
            logging: true,
            synchronize: true,
            entities: ['dist/**/*.entity{*.ts,*.js}'],
            logger: 'advanced-console',
        };
    }
}

const configService = new ConfigService();
export default configService;

//docker run --name trello-pg -e POSTGRES_DATABASE=trello -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=o6mz9QHYr76pIHND -d postgres
