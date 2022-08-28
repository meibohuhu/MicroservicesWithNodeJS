import { Publisher, Subjects, TicketUpdatedEvent } from "@wendy96tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}