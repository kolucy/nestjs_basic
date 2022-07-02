import * as express from 'express';
import { Cat, CatType } from './app.model';

// app - express의 인스턴스. 서버 역할
const app: express.Express = express();
const port: number = 8000;

/*
express middleware
middleware는 use 메소드를 통해 생성 - 전체적으로 관리하는 미들웨어 생성
middleware는 순서가 중요
middleware를 router 뒤에 쓸 경우, express가 endpoint(경로)를 찾으면 응답을 통해 통신을 끊기 때문
*/

//* logging middleware
app.use((req, res, next) => {
    // next: 다음 라우터로 이동할 수 있는 함수
    console.log(req.rawHeaders[1]);
    console.log('this is logging middleware');
    next(); // 다음 라우터 실행, 경로에 해당하는 라우터를 찾는다
});

app.get('/cats/som', (req, res, next) => {
    console.log(req.rawHeaders[1]);
    console.log('this is som middleware');
    next()
});

// router - '/' 경로로 요청했을 때 응답 (/는 생략 가능)
app.get('/', (req: express.Request, res: express.Response) => {
    res.send({ cats: Cat });
});

app.get('/cats/blue', (req, res) => {
    res.send({ blue: Cat[0] });
});

app.get('/cats/som', (req, res) => {
    res.send({ som: Cat[1] });
});

//* 404 middleware - express가 경로를 찾지 못했을 때의 middleware 작성
app.use((req, res, next) => {
    console.log('this is logging middleware');
    res.send({ errpr: '404 not found error' });
});


// listen - 서버를 연다
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
