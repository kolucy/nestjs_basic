/* 라우터에 서비스 패턴 적용
서비스 패턴을 사용하여 라우터와 비즈니스 로직을 분리해서 유지보수와 가독성을 높인다
*/

import { Request, Response } from "express";
import { Cat, CatType } from './cats.model';

//* READ 고양이 전체 데이터 조회 -> GET
export const readAllcat = (req: Request, res: Response) => {
    try {
        const cats = Cat;
        //throw new Error("db connect error")
        res.status(200).send({
            success: true,
            data: {
                cats
            }
        })
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
};
// 상태 코드: 200~ 응답성공, 400~ 응답실패, 500~ 서버 문제

//* READ 특정 고양이 데이터 조회 (동적 라우팅)
export const readCat = (req: Request, res: Response) => {
    try {
        // const id = req.params.id
        /* 유저가 로그인하면 그 정보가 session, cookie, jwt 등의 형식으로 저장됨
        프론트엔드는 저장된 유저 데이터에 id 값을 읽어와서 보낸다 */
        const params = req.params;
        console.log(params); // { id: 'fsduifh' }
        // list 형태의 경우 find 메소드 사용 가능
        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        })
        res.status(200).send({
            success: true,
            data: {
                cat
            }
        })
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
};

//* CREATE 새로운 고양이 추가 -> POST
export const createCat = (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data) // json middleware 없이는 undefined로 넘어옴
        Cat.push(data); // create
        res.status(200).send({
            success: true,
            data: { data }
        });
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
};

//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = body;
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                cat: result
            }
        });
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = { ...cat, ...body }; //구조 분해 할당
                // 원래 있었던 데이터(cat)을 구조분해 시키고, 새롭게 올라온 데이터(body)를 구조분해 시키면 기존의 key에서 중복된 key에 대한 value값을 바꿔준다
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                cat: result
            }
        });
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        const newCat = Cat.filter((cat) => cat.id !== params.id);
        res.status(200).send({
            success: true,
            data: newCat
        });
    } catch (error: any) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
};