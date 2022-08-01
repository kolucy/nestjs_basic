import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

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
  };
}

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
