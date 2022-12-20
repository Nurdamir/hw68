export interface Task {
 title: string;
 status: boolean;
 id?: string;
}

export type ApiTask = Omit<Task, 'id'>

export interface ApiTasksList {
 [id: string]: ApiTask;
}

