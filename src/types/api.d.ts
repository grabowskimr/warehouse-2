interface RequestData {
    action: string,
    [dataName: string]: any
}

interface ReturnedData {
    message: string,
    data: object[any],
    status: boolean
}

interface ResponseObject {
    data: ReturnedData,
    [dataName: string]: any
}

interface LoginData {
    login: string,
    id: string,
    session_id: string,
    profile: string,
    email: string,
    name: string
}