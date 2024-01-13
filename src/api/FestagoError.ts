class FestagoError implements Error {
  name: string = '';
  errorCode: string;
  message: string;
  status: number;
  result: any;

  constructor(errorCode: string, message: string, status: number, result: any) {
    this.errorCode = errorCode;
    this.message = message;
    this.status = status;
    this.result = result;
  }
}

export default FestagoError;
