import { Publisher, OrderCreatedEvent, Subjects } from "@wendy96tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}