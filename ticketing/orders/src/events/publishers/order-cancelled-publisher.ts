import { Publisher, OrderCancelledEvent, Subjects } from "@wendy96tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
