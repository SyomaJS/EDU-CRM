import { UniqueID } from './models/uniqueID.model';
export declare class UniqueIDService {
    private uniqueIDModel;
    constructor(uniqueIDModel: typeof UniqueID);
    generateID(): Promise<number>;
}
