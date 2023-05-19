import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async createMenu(menu: Partial<Menu>): Promise<Menu> {
    const newMenu = this.menuRepository.create(menu);
    return this.menuRepository.save(newMenu);
  }

  async findAllMenu(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async findAllMenuByCategory(category: string): Promise<Menu[]> {
    return this.menuRepository.find({ where: { category } });
  }

  async findOneMenuById(id: number): Promise<Menu> {
    return this.menuRepository.findOne({ where: { id } });
  }

  async updateMenu(id: number, menu: Partial<Menu>): Promise<Menu> {
    return await this.menuRepository.save({ ...menu, id });
  }

  async removeMenu(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }

  async findAllCategories(): Promise<string[]> {
    const categories = await this.menuRepository
      .createQueryBuilder('menu')
      .select('menu.category')
      .distinct(true)
      .getRawMany();

    return categories.map((categoryItem) => categoryItem.menu_category);
  }
}
