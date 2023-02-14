import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            getAllItems: jest.fn(),
          },
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  describe('findAll', () => {
    it('should call itemService.getAllItems with parsedPage, parsedLimit, and search', async () => {
      const parsedPage = 2;
      const parsedLimit = 20;
      const search = 'test';
      const result = { items: [], total: 0 };
      (itemService.getAllItems as jest.Mock).mockResolvedValue(result);

      await itemController.findAll(parsedPage, parsedLimit, search);

      expect(itemService.getAllItems).toHaveBeenCalledWith(parsedPage, parsedLimit, search);
    });
  });
  
});
