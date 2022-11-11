import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor() {}
  async syncDatabase() {
    // 1. 특정 계정, 특정 리전의 VPC 정보, SUBNET 정보를 가져옴
    // 현재 데이터베이스에 없는 부분은 추가하고 있는 부분은 추가하지 않음
  }
}
