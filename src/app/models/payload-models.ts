export class PayloadResponse<T> {
    issuccess: boolean;
    data: T;
    error: PayloadError;
    isSuccess: boolean;
    count: number;
    results : results[];
}

export class PayloadError {
    code: number;
}

export class results {
    index : string;
    name : string;
    url : string;
    id: number;
    favourite: boolean;
}

