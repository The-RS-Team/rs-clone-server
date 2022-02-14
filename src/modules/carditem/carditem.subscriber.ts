import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { CardEntity } from '../card/models/card';

@EventSubscriber()
export class CarditemSubscriber implements EntitySubscriberInterface<CardEntity> {
  listenTo() {
    return CardEntity;
  }

  async afterLoad(carditem: CardEntity): Promise<void> {
    carditem.cardItemsCount = carditem.cardItems.length;
  }
}
