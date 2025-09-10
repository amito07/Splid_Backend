import { HttpException } from '@nestjs/common';

export class ErrorHandler {
  static handle(error: any, defaultMessage: string = 'Internal server error'): never {
    // Re-throw HttpExceptions as they are intentional
    if (error instanceof HttpException) {
      throw error;
    }
    
    // Log unexpected errors for debugging
    console.error('Unexpected error:', error);
    
    // Throw generic error for unexpected cases
    throw new HttpException(defaultMessage, 500);
  }
}