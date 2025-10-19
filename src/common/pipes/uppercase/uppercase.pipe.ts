import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return this.transformValue(value);
  }

  private transformValue(value: any): any {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    
    if (Array.isArray(value)) {
      return value.map(item => this.transformValue(item));
    }
    
    if (value !== null && typeof value === 'object') {
      const transformed: any = {};
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          transformed[key] = this.transformValue(value[key]);
        }
      }
      return transformed;
    }
    
    return value;
  }
}