import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Clientes, Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma : PrismaService){}

  async create(data: Prisma.ClientesCreateInput): Promise<Clientes> {
    return this.prisma.clientes.create({data})
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientesWhereUniqueInput;
    where?: Prisma.ClientesWhereInput;
    orderBy?: Prisma.ClientesOrderByWithRelationInput;
  }): Promise<Clientes[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.clientes.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(clientesWhereUniqueInput: Prisma.ClientesWhereUniqueInput,
  ): Promise<Clientes | null> {
    return this.prisma.clientes.findUnique({
      where:clientesWhereUniqueInput,
    });
  }

  async update(params:{
    where: Prisma.ClientesWhereUniqueInput;
    data: Prisma.ClientesUpdateInput;
  }): Promise<Clientes> {
    const {where, data} = params;
    return this.prisma.clientes.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ClientesWhereUniqueInput): Promise<Clientes>{
    return this.prisma.clientes.delete({
      where,
    });
  }
}
