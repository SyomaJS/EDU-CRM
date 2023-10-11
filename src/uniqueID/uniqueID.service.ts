import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueID } from './models/uniqueID.model';

@Injectable()
export class UniqueIDService {
  constructor(@InjectModel(UniqueID) private uniqueIDModel: typeof UniqueID) {}

  async generateID() {
    const unique_id = await this.uniqueIDModel.create({});
    return Number(unique_id.unique_id + 1000);
  }
}
