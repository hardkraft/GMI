import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

describe('AppModule', () => {
  let appModule: AppModule;
  let _module: TestingModule;

  beforeEach(async () => {
    _module = await Test.createTestingModule({
      imports: [AppModule.initialize()],
    }).compile();

    appModule = _module.get<AppModule>(AppModule);
  });

  // it('should be defined', () => {
  //   expect(appModule).toBeDefined();
  // });

  // it('should provide AppService', () => {
  //   expect(appModule.providers).toContain(AppService);
  // });

  // it('should provide PrismaService', () => {
  //   expect(appModule.providers).toContain(PrismaService);
  // });
});
