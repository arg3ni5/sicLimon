interface ResponsePost {
    ok: boolean;
    page: number;
    posts: Post[];
}

interface Post {
    _id?: string;
    imgs?: string[];
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
}

interface Usuario {
    _id?: string;
    avatar?: string;
    nombre?: string;
    email?: string;
    password?: string;
}