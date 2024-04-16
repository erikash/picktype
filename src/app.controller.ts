import { Controller, Get } from '@nestjs/common';
import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';
import { PickType } from '@nestjs/swagger';

class TestDto {
  firstname: string;
  lastname: string;

  @Expose({ toPlainOnly: true })
  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

class PickTestDto extends PickType(TestDto, [] as const) {}

class InheritenceTestDto extends TestDto {}

@Controller()
export class AppController {
  @Get('picktype')
  getPickTypeTest(): TestDto {
    const instance = plainToInstance(PickTestDto, {
      firstname: 'John',
      lastname: 'Doe',
    });

    const plain = instanceToPlain(instance);

    return plain as unknown as TestDto;
  }

  @Get('inheritence')
  getInheritenceTest(): TestDto {
    const instance = plainToInstance(InheritenceTestDto, {
      firstname: 'John',
      lastname: 'Doe',
    });

    const plain = instanceToPlain(instance);

    return plain as unknown as TestDto;
  }
}
