import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const mockPrismaService = {
      product: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return a product', async () => {
      const dto: CreateProductDto = {
        name: 'Test Product',
        description: 'description of the product',
        stock: 10,
      };
      const createdProduct = { id: '1', ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(createdProduct);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          id: '1',
          name: 'Test Product',
          description: 'description of the product',
          stock: 10,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(products);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product = {
        id: '1',
        name: 'Test Product',
        description: 'description of the product',
        stock: 10,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update and return the updated product', async () => {
      const dto: UpdateProductDto = { description: 'New description' };
      const updatedProduct = {
        id: '1',
        name: 'Product 1',
        stock: 5,
        description: 'New description',
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedProduct);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product and return void', async () => {
      const deletedProduct = {
        id: '1',
        name: 'Product 1',
        stock: 5,
        description: 'description',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(deletedProduct);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual(deletedProduct);
    });
  });
});
