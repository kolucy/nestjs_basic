import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { VisitorEntity } from 'src/visitors/visitors.entity';
import { TagEntity } from 'src/tags/tags.entity';

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

  //* Relation */

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    onDelete: 'CASCADE', // 사용자가 삭제되면 블로그도 삭제된다.
  })
  @JoinColumn([
    // foreignkey 정보들
    {
      name: 'author_id' /* db에 저장되는 필드 이름 */,
      referencedColumnName: 'id' /* USER의 id */,
    },
  ])
  author: UserEntity;

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blogs, {
    cascade: true, // 블로그를 통해 태그가 추가, 수정, 삭제되고 블로그를 저장하면 태그도 저장된다.
  })
  @JoinTable({
    // table
    name: 'BLOG_TAG',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog, {
    cascade: true,
  })
  visitors: VisitorEntity[];
}
