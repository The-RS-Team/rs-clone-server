import {SetMetadata} from '@nestjs/common';

export enum Messages {
    connect = 'connect',
    connectError = 'connect_error',
    disconnect = 'disconnect',
    sendMessage = 'send_message',
    hello = 'hello',
    newMessage = 'new_message',
    createRoom = 'create_room',
    deleteCard = 'delete_card',
    deleteColumn = 'delete_column',
    getCard = 'get_card',
    getCards = 'get_cards',
    getColumn = 'get_column',
    getColumns = 'get_columns',
    newCard = 'new_card',
    newColumn = 'new_column',
    updateCard = 'update_card',
    updateColumn = 'update_column',
}

export const jwtConstants = {
    secret: 'c3225469f9f8508d624ebc366494cf17',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
