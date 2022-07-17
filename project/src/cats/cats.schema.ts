import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options) // Schema 데코레이션을 사용하여 스키마 정의
export class Cat extends Document {
  // extends -> Document 상속 받음, Cat 클래스
  @Prop({
    required: true, // 반드시 필요한 속성 (default: false)
    unique: true, // unique해야 한다
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
// Cat 클래스를 스키마로 만들어줌
