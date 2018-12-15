import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface User {
  start?: NgbDateStruct;
  avatar?: string;
  displayName?: string;
}
