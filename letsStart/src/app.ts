import * as express from 'express';
//import { Cat, CatType } from './cats/cats.model';
import catsRouter from './cats/cats.route';

/* 싱글톤 패턴: 객체의 인스턴스가 오직 한 개만 생성되게 하는 패턴 - 유지보수와 확장성 제공
클래스가 있고, 이 클래스로 인스턴스를 하나만 찍어내는 패턴
싱글톤 패턴을 사용하는 이유: 최초의 한번에 new 연산자를 통해서 객체를 만들 수 있기 때문에, 추후 객체에 접근할 때 메모리 낭비를 방지할 수 있다.
또한 다른 클래스 간의 데이터 공유가 쉽다.
싱글톤 인스턴스, 즉 여기서는 app이 전역으로 사용되는 인스턴스이기 때문에 다른 클래스의 인스턴스들이 접근하여 사용할 수 있다.
*/

// app.ts에서 app에 Singleton Pattern 적용하기
class Server {
    public app: express.Application

    // 생성자 함수(constructor) - 클래스의 인스턴스 객체를 생성,초기화
    constructor() {
        const app: express.Application = express();
        this.app = app;
        // 인스턴스가 하나 찍힐 때 앱이 하나 생성됨
    }

    // 미들웨어 세팅 - route 분리
    private setRoute(){
        this.app.use(catsRouter);
    }

    private setMiddleware(){
        //* logging middleware
        this.app.use((req, res, next) => {
            // next: 다음 라우터로 이동할 수 있는 함수
            console.log(req.rawHeaders[1]);
            console.log('this is logging middleware');
            next(); // 다음 라우터 실행, 경로에 해당하는 라우터를 찾는다
        });

        //* json middleware: json 객체를 읽을 수 있는 middleware 추가
        this.app.use(express.json());

        this.setRoute();

        //* 404 middleware - express가 경로를 찾지 못했을 때의 middleware 작성
        this.app.use((req, res, next) => {
            console.log('this is logging middleware');
            res.send({ error: '404 not found error' });
        });
    }

    public listen() {
        this.setMiddleware(); // listen에서 middleware를 모두 세팅해준다
        this.app.listen(8000, () => {
            console.log('server is on...');
        })
    }
}

// 싱글톤 인스턴스 서버 실행
function init() {
    const server = new Server();
    server.listen();
}

init();

// ------------------------

/*
// app - express의 인스턴스. 서버 역할
const app: express.Express = express();
const port: number = 8000;

// npm run start:dev

// express middleware
// middleware는 use 메소드를 통해 생성 - 전체적으로 관리하는 미들웨어 생성
// middleware는 순서가 중요
// middleware를 router 뒤에 쓸 경우, express가 endpoint(경로)를 찾으면 응답을 통해 통신을 끊기 때문

// router - '/' 경로로 요청했을 때 응답 (/는 생략 가능)
app.get('/', (req: express.Request, res: express.Response) => {
    res.send({ cats: Cat });
});

app.get('/cats/blue', (req, res) => {
    res.send({ blue: Cat[0] });
});

// listen - 서버를 연다
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
*/