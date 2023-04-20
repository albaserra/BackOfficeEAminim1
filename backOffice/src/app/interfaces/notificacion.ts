export interface Notificacion {
    _id?:         ID;
    tipo:        string;
    mensaje:     string;
    usuario:       string;

    createdAt?:   AtedAt;
    updatedAt?:   AtedAt;
}

export interface ID {
    $oid: string;
}

export interface AtedAt {
    $date: DateClass;
}

export interface DateClass {
    $numberLong: string;
}
