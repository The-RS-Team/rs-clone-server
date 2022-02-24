import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  public createTypeOrmProdConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'trelloclone.postgres.database.azure.com',
      port: 5432,
      username: 'postgres@trelloclone',
      password: 'o6mz9QHYr76pIHND',
      logging: true,
      database: 'trello-db',
      synchronize: true,
      autoLoadEntities: true,
      logger: 'advanced-console',
      extra: {
        ssl: true,
      },
    };
  }
}

const configService = new ConfigService();
export default configService;

//docker run --name trello-pg -e POSTGRES_DATABASE=trello-db -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=o6mz9QHYr76pIHND -d postgres
// az postgres up --resource-group TrelloClone --location centralus --sku-name B_Gen5_1 --server-name trelloclone --database-name trello-db --admin-user postgres --admin-password o6mz9QHYr76pIHND --ssl-enforcement Enabled

// "connectionStrings": {
//     "ado.net": "Server=trelloclone.postgres.database.azure.com;Database=trello-db;Port=5432;User Id=postgres@trelloclone;Password=o6mz9QHYr76pIHND;",
//       "jdbc": "jdbc:postgresql://trelloclone.postgres.database.azure.com:5432/trello-db?user=postgres@trelloclone&password=o6mz9QHYr76pIHND",
//       "jdbc Spring": "spring.datasource.url=jdbc:postgresql://trelloclone.postgres.database.azure.com:5432/trello-db  spring.datasource.username=postgres@trelloclone  spring.datasource.password=o6mz9QHYr76pIHND",
//       "node.js": "var client = new pg.Client('postgres://postgres@trelloclone:o6mz9QHYr76pIHND@trelloclone.postgres.database.azure.com:5432/trello-db');",
//       "php": "host=trelloclone.postgres.database.azure.com port=5432 dbname=trello-db user=postgres@trelloclone password=o6mz9QHYr76pIHND",
//       "psql_cmd": "psql --host=trelloclone.postgres.database.azure.com --port=5432 --username=postgres@trelloclone --dbname=trello-db",
//       "python": "cnx = psycopg2.connect(database='trello-db', user='postgres@trelloclone', host='trelloclone.postgres.database.azure.com', password='o6mz9QHYr76pIHND', port='5432')",
//       "ruby": "cnx = PG::Connection.new(:host => 'trelloclone.postgres.database.azure.com', :user => 'postgres@trelloclone', :dbname => 'trello-db', :port => '5432', :password => 'o6mz9QHYr76pIHND')",
//       "webapp": "Database=trello-db; Data Source=trelloclone.postgres.database.azure.com; User Id=postgres@trelloclone; Password=o6mz9QHYr76pIHND"
// }
