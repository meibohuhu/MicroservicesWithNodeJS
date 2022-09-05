import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@wendy96tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
