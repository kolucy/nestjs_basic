import * as express from "express";

// app - express의 인스턴스. 서버 역할
const app: express.Express = express();
const port: number = 8000;

// router - "/" 경로로 요청했을 때 응답 (/는 생략 가능)
app.get("/", (req: express.Request, res: express.Response) => {
    console.log(req);
    res.send({ hello: 'world' });
});

// listen - 서버를 연다
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});