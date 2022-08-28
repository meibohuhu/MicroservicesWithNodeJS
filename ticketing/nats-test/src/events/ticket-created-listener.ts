import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // subject = 'ticket:created';
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {       // need make sure the Subject we list here matches up with the type of data that provide here.
    console.log('Event data!', data);

    // these two actually not exist
    // console.log(data.name);     // complain
    // console.log(data.cost);
    console.log(data.id);
    console.log(data.title);
    console.log(data.price);
    msg.ack();
  }
}