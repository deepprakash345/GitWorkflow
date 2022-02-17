import {IFileObject} from './types';

/**
 * Defines a file object which implements the {@link IFileObject | file object interface}
 */
export class FileObject implements IFileObject {
    data: any;
    mediaType: string = 'application/octet-stream';
    name: string = 'unknown';
    size: number = 0;

    public constructor(init?:Partial<FileObject>) {
        Object.assign(this, init);
    }
    public toJSON() {
        return {
            'name'                  : this.name,
            'size'                  : this.size,
            'mediaType'             : this.mediaType,
            'data'                  : this.data.toString()
        };
    }
};