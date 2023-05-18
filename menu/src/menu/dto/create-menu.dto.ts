import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'The name of the menu item' })
  name: string;

  @ApiProperty({ description: 'The description of the menu item' })
  description: string;

  @ApiProperty({ description: 'The price of the menu item' })
  price: number;

  @ApiProperty({ description: 'The availability of the menu item' })
  availability: boolean;

  @ApiProperty({ description: 'The category of the menu item' })
  category: string;
}
