export interface IWorker {
  /**
   * Init the worker process
   */
  init(): Promise<void>;

  /**
   * Execute the worker
   */
  executeAsync(): Promise<void>;
}
