import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsGateway } from 'src/websocket-example/notifications.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    // Actualizar el producto
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
    });

    // Verificar si el stock cambió y notificar
    if (
      updateProductDto.stock !== undefined &&
      updateProductDto.stock !== existingProduct.stock
    ) {
      this.notificationsGateway.notifyStockChange(
        productId,
        updateProductDto.stock,
      );
    }

    return updatedProduct;
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
