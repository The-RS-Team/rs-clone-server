import {SetMetadata} from '@nestjs/common';

export enum Messages {
    connect = 'connect',
    hello = 'hello',
    newMessage = 'new_message',
    createRoom = 'create_room',
    deleteCard = 'delete_card',
    deleteColumn = 'delete_column',
    deleteFile = 'delete_file',
    getCard = 'get_card',
    getCards = 'get_cards',
    getColumn = 'get_column',
    getColumns = 'get_columns',
    newCard = 'new_card',
    newColumn = 'new_column',
    newFile = 'new_file',
    getFile = 'get_file',
    getFiles = 'get_files',
    updateCard = 'update_card',
    updateColumn = 'update_column',
}

export const jwtConstants = {
    secret: 'c3225469f9f8508d624ebc366494cf17',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
