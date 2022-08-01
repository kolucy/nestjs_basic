import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // Schema 데코레이션을 사용하여 스키마 정의
export class Cat extends Document {
  // extends -> Document 상속 받음, Cat 클래스
  @ApiProperty({
    example: 'mimi@kakao.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true, // 반드시 필요한 속성 (default: false)
    unique: true, // unique해야 한다
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'mimi',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '23810',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments', // 해당하는 스키마
  localField: '_id',
  foreignField: 'info', // info(작성 대상)를 기준으로 comments를 가져온다
});
// populate: 다른 document랑 이어줄 수 있는 method -> 옵션 설정
_CatSchema.set('toObject', { virtuals: true }); // 옵션1: 객체로 변환이 가능한 것
_CatSchema.set('toJSON', { virtuals: true }); // 옵션2: JSON 형식으로 변환이 가능한 것

export const CatSchema = _CatSchema;

/*
export const CatSchema = SchemaFactory.createForClass(Cat);
// Cat 클래스를 스키마로 만들어줌

// virtual field 생성 - field name: readOnlyData
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // this: DB 객체
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
*/
