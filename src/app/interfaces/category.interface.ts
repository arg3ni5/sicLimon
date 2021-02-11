export interface Category {
    _id?: string;
    created?: Date;
    name?: string;
    parent?: Category;
    childrens?: any[];
}