import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { AdminModule as AdminBroModule } from '@adminjs/nestjs';
import { getModelToken } from '@nestjs/mongoose';
import { Blog } from '../blog/blog.schema';
import { Model } from 'mongoose';
import { BlogModule } from '../blog/blog.module';

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    AdminBroModule.createAdminAsync({
      imports: [BlogModule],
      inject: [getModelToken(Blog.name)],
      useFactory: (blogModel: Model<Blog>) => ({
        adminJsOptions: {
          rootPath: '/admin', // admin site가 나올 경로
          /*
          rootPath: '/xyzadmin', // path를 숨길 수 있다(uuid 또는 secretkey 등으로 path 지정)
          loginPath: '/xyzadmin/login', // rootPath 기본값(/admin) 설정시 /admin/login으로 redirect
          */
          resources: [
            {
              resource: blogModel,
              options: {
                properties: {
                  contents: { type: 'richtext' },
                },
              },
            },
          ],
        },
        dashboard: {
          component: AdminJS.bundle('./dashboard'), // react 컴포턴트 삽입
        },
        branding: {
          companyName: 'Lucy',
          logo: false, // logo 설정 옵션, false 설정시 typo 적용
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'test@test.com' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
      // customLoader: ExpressCustomLoader,
    }),
  ],
})
export class AdminModule {}
