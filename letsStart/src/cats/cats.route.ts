/* 라우터에 서비스 패턴 적용
서비스 패턴을 사용하여 라우터와 비즈니스 로직을 분리해서 유지보수와 가독성을 높인다
*/

import { Router } from 'express';
import { createCat, deleteCat, readAllcat, readCat, updateCat, updatePartialCat } from './cats.service';

const router = Router();

//* READ 고양이 전체 데이터 조회 -> GET
router.get('/cats', readAllcat);

//* READ 특정 고양이 데이터 조회 (동적 라우팅)
router.get('/cats/:id', readCat);

//* CREATE 새로운 고양이 추가 -> POST
router.post('/cats', createCat);

//* UPDATE 고양이 데이터 업데이트 -> PUT
router.put('/cats/:id', updateCat);

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch('/cats/:id', updatePartialCat);

//* DELETE 고양이 데이터 삭제 -> DELETE
router.delete('/cats/:id', deleteCat);

export default router;