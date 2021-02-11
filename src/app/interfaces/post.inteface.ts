import { Category } from './category.interface';
import { Usuario } from './usuario.interface';
interface ResponsePost {
    ok: boolean;
    page: number;
    posts: Post[];
}

interface Post {
    _id?: string;
    imgs?: string[];
    mensaje?: string;
    direccion?: string;
    coords?: string;
    usuario?: Usuario;
    category?: Category;
    created?: string;
}

export { ResponsePost, Post }