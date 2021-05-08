import { Logger } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/models/auth/auth.module';
import { AuthService } from 'src/models/auth/auth.service';
import { GCPMysqlDatabaseProviderModule } from 'src/providers/database/mysql-dev/provider.module';
import { Seeder } from './seeder';

/**
 * Import and provide seeder classes.
 * 더미 데이터 생성기
 * @module
 */
@Module({
  imports: [GCPMysqlDatabaseProviderModule, AuthModule],
  providers: [AuthService, Logger, Seeder],
})
export class SeederModule {}
