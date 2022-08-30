import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { UserEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { TagsModule } from './tags/tags.module';
import { VisitorsModule } from './visitors/visitors.module';
import { ProfilesModule } from './profiles/profiles.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService, // ConfigService 주입
  ): Promise<TypeOrmModuleOptions> => ({
    //함수에서 옵션 설정
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DB_HOST'), // 직접 사용시 process.env.DB_HOST
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity],
    synchronize: true, //! set 'false' in production
    // 초기 개발 단계에서는 synchronize를 true로 하면 좋고, production 레벨에서는 무조건 false 설정 후 migration해야 함
    // true 설정시 DB 데이터를 전부 날리고 다시 새로 만드는 작업을 하므로 DB 파손 위험 있음 => 배포 단계에서는 migration 파일을 사용
    autoLoadEntities: true,
    logging: true, // logging 또한 개발 환경에서만 true 설정 권장
    // 쿼리 로그는 개발 환경에서는 필요하지만 배포 단계에서는 필요없는 로그이기 때문
    keepConnectionAlive: true, // 연결할 때까지 살아있는다(시도한다)
  }),
  inject: [ConfigService], // configService.get()으로 접근해서 가져오기 위해 의존성 주입
};

@Module({
  imports: [
    ConfigModule.forRoot({
      // ConfigModule을 통해 env 파일 모두 import
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(5000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BlogsModule,
    TagsModule,
    VisitorsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
