import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ItemCreateDto } from './dto/item-create.dto';
import { ItemDto } from './dto/item.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ItemDto> {
    return await this.itemService.getOneItem(id);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string
  ): Promise<{ items: Item[]; total: number }> {
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    return await this.itemService.getAllItems(parsedPage, parsedLimit, search);
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() itemCreateDto: ItemCreateDto) {
    return this.itemService.create(itemCreateDto);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() itemDto: ItemDto,
  ): Promise<ItemDto> {
    return await this.itemService.update(id, itemDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async destory(@Param('id') id: number): Promise<ItemDto> {
    return await this.itemService.destoryTodo(id);
  }
}
