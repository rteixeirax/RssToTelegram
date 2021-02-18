export interface IWorker {
  startAsync(): Promise<void>;
  executeAsync(): Promise<void>;
}
