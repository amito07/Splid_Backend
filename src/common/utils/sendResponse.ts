// src/common/dtos/generic-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SendResponse<T> {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Success', description: 'A descriptive message' })
  message: string;

  @ApiProperty({ description: 'The actual data payload' })
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}