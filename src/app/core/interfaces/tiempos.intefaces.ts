export interface TabData {
  id: string;
  ServerName: string;
  icon: string;
  active: boolean;
  serverHost_db?:string;
  id_conexion_db?:number;
  instancia_db?:string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  active: boolean;
  ruta:string;
}