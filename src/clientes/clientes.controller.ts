import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Prisma } from '@prisma/client';

@Controller('clientes') // Define a rota base "/clientes"
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() data: Prisma.ClientesCreateInput) {
    return this.clientesService.create(data);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    return this.clientesService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? { id: Number(cursor) } : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientesService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.ClientesUpdateInput) {
    return this.clientesService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientesService.remove({ id: Number(id) });
  }
}
