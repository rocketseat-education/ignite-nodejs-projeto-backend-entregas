import { Request, Response } from 'express';
import { FindAllAvailableUseCase } from './FindAllAvailableUseCase';

export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const findAllWithoutEndDateUseCase = new FindAllAvailableUseCase();

    const deliveries = await findAllWithoutEndDateUseCase.execute();

    return response.json(deliveries);
  }
}
