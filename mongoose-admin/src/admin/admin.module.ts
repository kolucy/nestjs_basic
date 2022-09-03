import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { AdminModule as AdminBroModule } from '@adminjs/nestjs';
import { BlogModule } from 'src/blog/blog.module';
import { getModelToken } from '@nestjs/mongoose';
import { Blog } from 'src/blog/blog.schema';
import { Model } from 'mongoose';

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    AdminBroModule.createAdminAsync({
      imports: [BlogModule],
      inject: [getModelToken(Blog.name)],
      useFactory: (blogModel: Model<Blog>) => ({
        adminJsOptions: {
          rootPath: '/admin', // admin site가 나올 경로
          resources: [{ resource: blogModel }],
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'test' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
      // customLoader: ExpressCustomLoader,
    }),
  ],
})
export class AdminModule {}
