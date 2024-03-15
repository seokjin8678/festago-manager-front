class FestagoError implements Error {
  name: string = 'FestagoError';
  errorCode: string;
  message: string;
  status: number;
  result: any;
  isValidError = () => this.errorCode === 'INVALID_REQUEST_ARGUMENT'

  constructor(errorCode: string, message: string, status: number, result: any) {
    this.errorCode = errorCode;
    this.message = message;
    this.status = status;
    this.result = result;
  }
}

export default FestagoError;
