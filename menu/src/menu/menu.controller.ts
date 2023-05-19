import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { MenuService } from './menu.service';
import { Menu } from './menu.entity';

import { CreateMenuDto } from './dto/create-menu.dto';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get('categories')
  @ApiOperation({ summary: 'Get all unique categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  findAllCategories(): Promise<string[]> {
    return this.menuService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu retrieved successfully' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Menu> {
    return this.menuService.findOneMenuById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiBody({
    description: 'The menu creation payload',
    type: CreateMenuDto,
  })
  @ApiResponse({ status: 200, description: 'Menu updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() menu: Partial<Menu>,
  ): Promise<Menu> {
    return this.menuService.updateMenu(id, menu);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.menuService.removeMenu(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a menu' })
  @ApiBody({
    description: 'The menu creation payload',
    type: CreateMenuDto,
  })
  @ApiResponse({ status: 201, description: 'Menu created successfully' })
  create(@Body() menu: CreateMenuDto): Promise<Menu> {
    return this.menuService.createMenu(menu);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus by category' })
  @ApiResponse({ status: 200, description: 'Menus filtered successfully' })
  findMenusByCategory(@Query('category') category: string): Promise<Menu[]> {
    return this.menuService.findAllMenuByCategory(category);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'Menus retrieved successfully' })
  findAll(): Promise<Menu[]> {
    return this.menuService.findAllMenu();
  }
}
