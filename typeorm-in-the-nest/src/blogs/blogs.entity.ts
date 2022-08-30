import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'BLOG', // 테이블 명
})
export class BlogEntity extends CommonEntity {
  /*
  // IsEmail, IsNotEmpty: class-validator => DB에 저장되기 직전에 에러 검사
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  */
  // Column 데코레이터를 사용하여 DB에 저장될 데이터 속성을 정의
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  contents: string;
}
