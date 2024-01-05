export interface TaskType {
  id: number;
  desc: string;
  estimateAt: Date;
  doneAt?: Date;
}
