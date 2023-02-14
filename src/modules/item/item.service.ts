import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCreateDto } from './dto/item-create.dto';
import { Item } from './item.entity';
import { toItemDto } from '../../shared/mapper';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(itemCreateDto: ItemCreateDto) {
    const item: Item = await this.itemRepository.create(itemCreateDto);

    await this.itemRepository.save(item);

    return toItemDto(item);
  }

  async getAllItems(page: number, limit: number, search?: string): Promise<{ items: Item[]; total: number, page: number, limit: number}> {
    const skip = (page - 1) * limit;
    const query = this.itemRepository.createQueryBuilder("item");
  
    if (search) {
      query.where("item.name LIKE :search", { search: `%${search}%` });
    }
  
    const [items, total] = await query
      .orderBy("item.createdOn", "DESC")
      .take(limit)
      .skip(skip)
      .getManyAndCount();
  
    return { items, total, page, limit };
  }

  async getOneItem(id: number): Promise<ItemDto> {
    const item = await this.itemRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new HttpException(
        `Item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toItemDto(item);
  }


  async update(id: number, itemDto: ItemDto): Promise<ItemDto> {
    const { name, description, price, status,  } = itemDto;

    let item: Item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new HttpException(
        `Item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    item = {
      id,
      name,
      description,
      price,
      status
    };

    await this.itemRepository.update({ id }, item); // update

    item = await this.itemRepository.findOne({
      where: { id }
    }); // re-query

    return toItemDto(item);
  }

  async destoryTodo(id: number): Promise<ItemDto> {
    const item: Item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new HttpException(
        `Item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.itemRepository.delete({ id }); // delete todo list

    return toItemDto(item);
  }
}
