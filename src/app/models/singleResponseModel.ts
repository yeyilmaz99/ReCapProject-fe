import { ResponseModel } from "./responseModel";

export interface SignleResponseModel<T> extends ResponseModel{
    data:T;
}