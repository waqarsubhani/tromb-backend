import { UserEntity } from '../modules/users/entity/user.entity';
import { UserDto } from '../modules/users/dto/user.dto';
import { Item } from 'src/modules/item/item.entity';
import { ItemDto } from 'src/modules/item/dto/item.dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;

  let userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
}


export const toItemDto = (data: Item): ItemDto => {
  const { id, name, description, price, status, createdOn, updatedOn  } = data;

  let itemDto: ItemDto = {
    id,
    name,
    description,
    price,
    status,
    createdOn,
    updatedOn
  };

  return itemDto;
};