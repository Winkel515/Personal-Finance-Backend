import { Test, TestingModule } from '@nestjs/testing';
import { LinkTokenController } from './link.controller';

describe('LinkTokenController', () => {
  let controller: LinkTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkTokenController],
    }).compile();

    controller = module.get<LinkTokenController>(LinkTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
