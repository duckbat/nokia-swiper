import {Document, Schema} from 'mongoose';

export type ISession = Document & {
    sessionId: string;
    username?: string;
    anonymous: boolean;   
    swipes: { questionId: Schema.Types.ObjectId; questionText: string; response: boolean }[];
    isComplete: boolean;
};
