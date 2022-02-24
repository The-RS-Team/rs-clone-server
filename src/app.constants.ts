export enum Messages {
  connect = 'connect',
  createRoom = 'create_room',
  deleteCard = 'delete_card',
  deleteColumn = 'delete_column',
  deleteFile = 'delete_file',
  getCard = 'get_card',
  getCards = 'get_cards',
  getColumn = 'get_column',
  getColumns = 'get_columns',
  getFile = 'get_file',
  getFiles = 'get_files',
  hello = 'hello',
  newCard = 'new_card',
  newColumn = 'new_column',
  newFile = 'new_file',
  newMessage = 'new_message',
  updateCard = 'update_card',
  updateColumn = 'update_column',
  getCarditems = 'get_carditems',
  newCarditem = 'new_carditem',
  getCarditem = 'get_carditem',
  deleteCarditem = 'delete_carditem',
  updateCarditem = 'update_carditem',
  getAtivityByUser = 'get_ativitybyuser',
  getAtivityByBoard = 'get_ativitybyboard',
  newInvite = 'new_invite',
  getInvite = 'get_invite',
  checkInvitesByEmail = 'check_invitesbyemail',
  deleteInvite = 'delete_invite',
  deleteUsersToBoards = 'delete_userstoboards',
  getUsersToBoards = 'get_userstoboards',
}

export enum Actions {
  insert = 'insert',
  delete = 'delete',
  update = 'update'
}

export enum Tables {
  board = 'board',
  card = 'card',
  cardItem = 'cardItem',
  column = 'column',
  file = 'file'
}
