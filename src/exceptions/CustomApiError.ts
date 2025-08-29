class CustomApiError extends Error {
  public readonly statusCode?: number;
  public readonly code?: string;

  constructor(message: string, statusCode?: number, code?: string) {
    super(message);
    this.name = "CustomApiError";
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, CustomApiError.prototype);
  }
}
