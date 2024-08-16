import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiServices: OpenaiService) {}

  @Post()
  sendToOpenAI(
    @Body()
    { messages }: { messages: [{ role: string; content: string }] | [] },
  ) {
    return this.openaiServices.sendToOpenAI(messages || []);
  }
}
