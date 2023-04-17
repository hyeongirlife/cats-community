import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../schema/cat.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({ example: '309294', description: 'id' }) id: string;
}

// export class ReadOnlyCatDto {
//   @ApiProperty({
//     example: 'test@test.test',
//     description: 'email',
//     required: true,
//   })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     example: 'test',
//     description: 'password',
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   password: string;

//   @ApiProperty({
//     example: 'test',
//     description: 'name',
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;
// }
