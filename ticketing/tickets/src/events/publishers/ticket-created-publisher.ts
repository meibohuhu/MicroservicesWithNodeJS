import { Publisher, Subjects, TicketCreatedEvent } from "@wendy96tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}