import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// describe: 테스트 단위를 묶는 함수
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it은 하나의 테스트 단위
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  describe('hello jest', () => {
    test('two plus two is four', () => {
      expect(2 + 2).toBe(4);
    });
  });

  describe('/users', () => {
    it('/users (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users');
      expect(res.statusCode).toBe(401);
    });

    it('/users (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        email: 'test@test.com',
        password: 'test',
        username: 'test',
      });
      expect(res.statusCode).toBe(401);
      console.log(res.body);
    });

    it('/users/login (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users/login').send({
        email: 'test@test.com',
        password: 'test',
      });
      expect(res.statusCode).toBe(201);
      console.log(res.headers);
    });
  });
});
