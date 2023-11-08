export interface Todo {
    _id: string;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    image: string;
    status: string;
}

export interface MainStateType {
    dialogNewTask: boolean;
    loading: boolean;
    todo: Todo;
    todos: Todo[];
}
export interface SubStateType {
    images:any[];
    loading: boolean;
    imageURLs:string[];
    status: string;
}